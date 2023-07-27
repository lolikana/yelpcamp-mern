export type TLogin = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  userId: string;
  email: string;
  token: string;
};
