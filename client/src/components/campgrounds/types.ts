export type TCampground = {
  title: string;
  location: string;
  description: string;
  price: string;
  images?: FileList | never[];
  geometry: { type: 'Point'; coordinates: [number, number] };
};

export type TResponseCampground = {
  _id: string;
  images: { url: string; filename: string }[];
} & TCampground;
