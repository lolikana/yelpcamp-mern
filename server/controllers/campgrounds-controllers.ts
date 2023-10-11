import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { UploadApiResponse } from 'cloudinary';
import { RequestHandler } from 'express';
import { ICampground } from 'libs/types';
import { Types } from 'mongoose';

import cloudinary from '../configs/cloudinary';
import { campgroundSchema } from '../libs/validations';
import { CampgroundModel } from './../models/campground-model';
import { ExpressError } from './../utils';

const mapboxToken = process.env.MAPBOX_TOKEN;

const geocoder = mbxGeocoding({
  accessToken: mapboxToken === undefined ? '' : mapboxToken
});

export default {
  create: (async (req, res, next) => {
    try {
      const body = req.body as { campground: ICampground };
      const result = campgroundSchema.safeParse(body);
      if (!result.success) {
        const error = new ExpressError(result.error.issues[0].message, 422);
        return next(error);
      }
      const geoData = await geocoder
        .forwardGeocode({ query: result.data.location, limit: 1 })
        .send();
      const campground = new CampgroundModel(body);
      campground.geometry = geoData.body.features[0].geometry;

      if (!req.files) {
        return next(new ExpressError('Please upload an image', 400));
      }

      campground.images = [];

      if (Array.isArray(req.files)) {
        for (const file of req.files) {
          (campground.images as { url: string; filename: string }[]).push({
            url: file.path,
            filename: file.filename
          });
        }
      } else if (typeof req.files === 'object') {
        for (const key in req.files) {
          if (Array.isArray(req.files[key])) {
            for (const file of req.files[key]) {
              (campground.images as { url: string; filename: string }[]).push({
                url: file.path,
                filename: file.filename
              });
            }
          }
        }
      }

      campground.author = new Types.ObjectId(req.userData.userId as string);
      await campground.save();
      res.json({
        campgroundId: campground.id as string
      });
    } catch (err) {
      if (err instanceof Error) {
        const error = new ExpressError(err.message, 500);
        return next(error);
      }
      const error = new ExpressError(
        'Could not create a campground, please try again',
        500
      );
      next(error);
    }
  }) as RequestHandler,

  update: (async (req, res, next) => {
    try {
      const { campgroundId } = req.params;
      const body = req.body as { campground: ICampground };
      const result = campgroundSchema.safeParse(body);
      if (!result.success) {
        const error = new ExpressError(result.error.issues[0].message, 422);
        return next(error);
      }

      const geoData = await geocoder
        .forwardGeocode({ query: result.data.location, limit: 1 })
        .send();

      const campground = await CampgroundModel.findOneAndUpdate(
        {
          author: req.userData.userId as string,
          _id: campgroundId
        },
        { ...result.data, geometry: geoData.body.features[0].geometry },
        { new: true }
      );

      const images: { url: string; filename: string }[] = (
        req.files as UploadApiResponse
      ).map((file: any) => ({
        url: file.path,
        filename: file.filename
      }));

      if (images.length !== 0) {
        (campground?.images as { url: string; filename: string }[]).push(...images);
        await campground?.save();
      }

      res.json({
        campgroundId: campgroundId
      });
    } catch (err) {
      const error = new ExpressError(
        'Could not update the campground, please try again',
        500
      );
      next(error);
    }
  }) as RequestHandler,

  readAll: (async (req, res, next) => {
    try {
      const campgrounds = await CampgroundModel.find({
        author: req.userData.userId as string
      });

      res.json(campgrounds);
    } catch (err) {
      const error = new ExpressError(
        'Something went wrong when fetching the campgrounds',
        500
      );
      next(error);
    }
  }) as RequestHandler,

  readOne: (async (req, res, next) => {
    try {
      const { campgroundId } = req.params;
      const campground = await CampgroundModel.findOne({
        author: req.userData.userId as string,
        _id: campgroundId
      });
      res.json(campground);
    } catch (err) {
      const error = new ExpressError(
        'Something went wrong when fetching the campground',
        500
      );
      next(error);
    }
  }) as RequestHandler,

  delete: (async (req, res, next) => {
    try {
      const { campgroundId } = req.params;
      const campground = await CampgroundModel.findById(campgroundId);
      await CampgroundModel.findOneAndDelete({
        author: req.userData.userId as string,
        _id: campgroundId
      });
      if (campground) {
        (campground.images as { url: string; filename: string }[]).map(
          async img => await cloudinary.uploader.destroy(img.filename)
        );
      }
      res.status(200).json({ message: 'Deleted campground.' });
    } catch (err) {
      const error = new ExpressError(
        'Something went wrong when trying to delete the campground',
        500
      );
      next(error);
    }
  }) as RequestHandler
};
