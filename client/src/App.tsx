import '@styles/styles.scss';

import { Campgrounds, CreateCampground } from '@pages/campgrounds';
import Homepage from '@pages/homepage/Homepage';
import Login from '@pages/login/Login';
import RootLayout from '@pages/root-layout/RootLayout';
import Signup from '@pages/signup/Signup';
import { useCallback, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AuthContext } from './context/auth-context';

function App() {
  const [uid, setUid] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback((uid: string, token: string) => {
    setUid(uid);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setUid(null);
    setToken(null);
  }, []);

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
          { path: '/campgrounds', element: <Campgrounds /> },
          { path: '/campgrounds/new-campground', element: <CreateCampground /> },
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
