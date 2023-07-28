import { ICampground } from 'libs/types';
import { model, Schema, Types } from 'mongoose';

const ImageSchema = new Schema({
  url: String,
  filename: String
});

const CampgroundSchema = new Schema<ICampground>({
  title: {
    required: true,
    type: String
  },
  images: {
    required: true,
    type: [ImageSchema]
  },
  price: {
    required: true,
    type: Number
  },
  location: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  geometry: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  author: {
    type: Types.ObjectId,
    ref: 'User'
  }
});

export const CampgroundModel = model('Campground', CampgroundSchema);
