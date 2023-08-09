export type TCampground = {
  title: string;
  location: string;
  description: string;
  price: string;
  images?: FileList;
};

export type TResponseCampground = {
  _id: string;
  images: { url: string; filename: string }[];
} & TCampground;
