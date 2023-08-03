import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { CampgroundModel } from './../models/campground-model';
import { ExpressError } from './../utils';
import { campgroundSchema } from './../utils/validations';

export default {
  create: (async (req, res, next) => {
    try {
      const result = campgroundSchema.safeParse(req.body);
      if (!result.success) {
        const error = new ExpressError(result.error.issues[0].message, 422);
        return next(error);
      }

      const campground = new CampgroundModel(req.body);
      campground.geometry = { type: 'Point', coordinates: [100, 100] };
      campground.images = [
        {
          url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          filename: 'image_01'
        },
        {
          url: 'https://images.unsplash.com/photo-1601134917279-ef70a0a90f18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          filename: 'image_02'
        }
      ];
      campground.author = new Types.ObjectId(req.userData.userId as string);
      await campground.save();
      res.json({
        campgroundId: campground.id as string
      });
    } catch (err) {
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
      const result = campgroundSchema.safeParse(req.body);
      if (!result.success) {
        const error = new ExpressError(result.error.issues[0].message, 422);
        return next(error);
      }

      await CampgroundModel.findOneAndUpdate(
        {
          author: req.userData.userId as string,
          _id: campgroundId
        },
        { ...result.data },
        { new: true }
      );
      res.json({
        campgroundId: campgroundId
      });
    } catch (err) {
      const error = new ExpressError(
        'Could not create a campground, please try again',
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
        'Something went wrong whent fetching the campgrounds',
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
        'Something went wrong whent fetching the campground',
        500
      );
      next(error);
    }
  }) as RequestHandler,

  delete: (async (req, res, next) => {
    try {
      const { campgroundId } = req.params;
      await CampgroundModel.findOneAndDelete({
        author: req.userData.userId as string,
        _id: campgroundId
      });
      res.status(200).json({ message: 'Deleted campground.' });
    } catch (err) {
      const error = new ExpressError(
        'Something went wrong whent fetching the campgrounds',
        500
      );
      next(error);
    }
  }) as RequestHandler
};
