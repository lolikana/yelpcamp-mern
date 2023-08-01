import '@styles/styles.scss';

import {
  CampgroundDetail,
  Campgrounds,
  CreateCampground,
  UpdateCampground
} from '@pages/campgrounds';
import Homepage from '@pages/homepage/Homepage';
import Login from '@pages/login/Login';
import RootLayout from '@pages/root-layout/RootLayout';
import Signup from '@pages/signup/Signup';
import { useCallback, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AuthContext } from './context/auth-context';
import {
  action as deleteCampgroundAction,
  loader as campgroundDetailLoader
} from './pages/campgrounds/CampgroundDetail';
import { loader as campgroundsLoader } from './pages/campgrounds/Campgrounds';

let logoutTimer: Timeout;
function App() {
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
      console.log(remainingTime);
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
    }
  }, [login]);

  let router;
  if (!token) {
    router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <Homepage /> },
          { path: 'login', element: <Login /> },
          { path: 'signup', element: <Signup /> },
          { path: '*', element: <Navigate to="/" /> }
        ]
      }
    ]);
  } else {
    router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <Homepage /> },
          {
            path: 'campgrounds',
            children: [
              {
                index: true,
                element: <Campgrounds />,
                loader: () => campgroundsLoader(token)
              },
              { path: 'new-campground', element: <CreateCampground /> },
              {
                path: ':campgroundId',
                id: 'campground-detail',
                loader: ({ params }) =>
                  campgroundDetailLoader(params.campgroundId as string, token),
                children: [
                  {
                    index: true,
                    element: <CampgroundDetail />,
                    action: ({ params }) =>
                      deleteCampgroundAction(params.campgroundId as string, token)
                  },
                  { path: 'update', element: <UpdateCampground /> }
                ]
              }
            ]
          },
          { path: '*', element: <Navigate to="/" /> }
        ]
      }
    ]);
  }

  return (
    <AuthContext.Provider
      value={{ uid: uid, token: token, login: login, logout: logout }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
