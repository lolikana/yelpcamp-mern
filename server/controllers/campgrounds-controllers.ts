import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { RequestHandler } from 'express';
import { ICampground } from 'libs/types';

import cloudinary from '../configs/cloudinary';
import prisma from '../configs/mongodb';
import { campgroundSchema } from '../libs/validations';
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

      const campground = await prisma.campground.create({
        data: {
          author: { connect: { id: req.userData.userId as string } },
          description: result.data.description,
          location: result.data.location,
          price: +result.data.price,
          title: result.data.title,
          geometry: geoData.body.features[0].geometry,
          images: []
        }
      });

      const images: { url: string; filename: string }[] = [];
      if (Array.isArray(req.files)) {
        for (const file of req.files) {
          images.push({
            url: file.path,
            filename: file.filename
          });
        }
      } else if (typeof req.files === 'object') {
        for (const key in req.files) {
          if (Array.isArray(req.files[key])) {
            for (const file of req.files[key]) {
              images.push({
                url: file.path,
                filename: file.filename
              });
            }
          }
        }
      }

      await prisma.campground.update({
        where: { id: campground.id },
        data: {
          images
        }
      });

      res.json({
        campgroundId: campground.id
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
      const campground = await prisma.campground.findFirst({
        where: {
          authorId: req.userData.userId as string,
          id: campgroundId
        }
      });

      if (!campground) {
        const error = new ExpressError('Campground not found', 404);
        return next(error);
      }

      const images: { url: string; filename: string }[] = campground.images;
      if (req.files) {
        (req.files as Express.Multer.File[]).forEach((file: Express.Multer.File) => {
          images.push({
            url: file.path,
            filename: file.filename
          });
        });
      }

      await prisma.campground.update({
        where: { id: campgroundId, authorId: req.userData.userId as string },
        data: {
          author: { connect: { id: req.userData.userId as string } },
          description: result.data.description,
          location: result.data.location,
          price: +result.data.price,
          title: result.data.title,
          geometry: geoData.body.features[0].geometry,
          images: images
        }
      });
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
      const campgrounds = await prisma.campground.findMany({
        where: {
          authorId: req.userData.userId as string
        }
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
      const campground = await prisma.campground.findFirst({
        where: {
          authorId: req.userData.userId as string,
          id: campgroundId
        }
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
      const campground = await prisma.campground.findFirst({
        where: {
          authorId: req.userData.userId as string,
          id: campgroundId
        }
      });

      if (!campground) {
        const error = new ExpressError('Campground not found', 404);
        return next(error);
      }

      await Promise.all(
        campground.images.map(async img => {
          void (await cloudinary.uploader.destroy(img.filename));
        })
      );

      await prisma.campground.delete({
        where: {
          authorId: req.userData.userId as string,
          id: campgroundId
        }
      });

      res.status(200).json({ message: 'Deleted campground.' }) as unknown as Response;
    } catch (err) {
      const error = new ExpressError(
        'Something went wrong when trying to delete the campground',
        500
      );
      next(error);
    }
  }) as RequestHandler
};
