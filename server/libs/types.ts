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
  id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
}

export interface ICampground {
  id: Types.ObjectId;
  title: string;
  images: IImgCamp[];
  price: number;
  description: string;
  location: string;
  geometry: IGeometry;
  author: Types.ObjectId;
}

interface IImgCamp {
  url: string;
  filename: string;
}

interface IGeometry {
  type: 'Point';
  coordinates: number[];
}
