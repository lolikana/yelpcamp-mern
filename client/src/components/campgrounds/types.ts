import { LngLatLike } from 'mapbox-gl';

export type TCampground = {
  title: string;
  location: string;
  description: string;
  price: string;
  images?: FileList | never[];
  geometry: { type: 'Point'; coordinates: [number, number] | LngLatLike };
};

export type TResponseCampground = {
  id: string;
  images: { url: string; filename: string }[];
} & TCampground;
