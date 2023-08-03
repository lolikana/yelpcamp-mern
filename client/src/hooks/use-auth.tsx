import { useCallback, useEffect, useState } from 'react';

let logoutTimer: ReturnType<typeof setTimeout>;

const useAuth = () => {
  const [uid, setUid] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState<string | null>(null);

  const login = useCallback((uid: string, token: string, expirationDate?: string) => {
    setUid(uid);
    setToken(token);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUid(null);
    setTokenExpirationDate(null);
    setToken(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        new Date(tokenExpirationDate).getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(+logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData') as string) as {
      userId: string;
      token: string;
      expiration: string;
    };
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, storedData.expiration);
    } else {
      logout();
    }
  }, [login]);

  return { uid, token, login, logout };
};

export default useAuth;
