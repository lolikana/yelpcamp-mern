export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup extends ILogin {
  username: string;
  confirmPassword: string;
}
