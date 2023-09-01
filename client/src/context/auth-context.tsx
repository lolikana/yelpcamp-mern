// /* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from 'react';

import checkToken from './../utils/checkToken';

type AuthContextType = {
  uid: string | null;
  token: string | null | undefined;
  login: (uid: string, token: string, expiration?: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  uid: null,
  token: checkToken.isAuthenticated()?.token,
  login: () => {},
  logout: () => {}
});
