// /* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

type AuthContextType = {
  uid: string | null;
  token: string | null;
  login: (uid: string, token: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  uid: null,
  token: null,
  login: () => {}
});
