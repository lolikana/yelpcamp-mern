export type TCampground = {
  title: string;
  location: string;
  description: string;
  price: number;
};

export type TResponseCampground = {
  _id: string;
  images: { url: string; filename: string }[];
} & TCampground;
