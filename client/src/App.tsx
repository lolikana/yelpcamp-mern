import '@styles/styles.scss';

import Campgrounds from '@pages/campgrounds/Campgrounds';
import Homepage from '@pages/homepage/Homepage';
import Login from '@pages/login/Login';
import RootLayout from '@pages/root-layout/RootLayout';
import Signup from '@pages/signup/Signup';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthContext } from './context/auth-context';

function App() {
  const [uid, setUid] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (uid: string, token: string) => {
    setUid(uid);
    setToken(token);
    console.log(uid, token);
  };

  let router;
  if (!token) {
    router = createBrowserRouter([
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <Homepage /> },
          { path: 'login', element: <Login /> },
          { path: 'signup', element: <Signup /> }
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
          { path: '/campgrounds', element: <Campgrounds /> }
        ]
      }
    ]);
  }

  return (
    <AuthContext.Provider value={{ uid: uid, token: token, login: login }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
