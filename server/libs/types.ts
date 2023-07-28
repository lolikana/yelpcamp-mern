import { Types } from 'mongoose';

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup extends ILogin {
  username: string;
  confirmPassword: string;
}

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  username: string;
}

export interface ICampground {
  _id: Types.ObjectId;
  title: string;
  images: IImgCamp[];
  price: number;
  description: string;
  location: string;
  geometry: IGeometry;
  author: IUser;
}

interface IImgCamp {
  url: string;
  filename: string;
}

interface IGeometry {
  type: 'Point';
  coordinates: number[];
}
