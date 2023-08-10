import { ICampground } from 'libs/types';
import { model, Schema } from 'mongoose';

const opts = { toJSON: { virtuals: true } };

const ImageSchema = new Schema({
  url: String,
  filename: String
});

// Virtual: because we don't need to store in the db
ImageSchema.virtual('thumbnail').get(function () {
  return this.url?.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema<ICampground>(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  opts
);

export const CampgroundModel = model('Campground', CampgroundSchema);
