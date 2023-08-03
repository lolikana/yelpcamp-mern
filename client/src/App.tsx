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
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { AuthContext } from './context/auth-context';
import useAuth from './hooks/use-auth';
import {
  action as deleteCampgroundAction,
  loader as campgroundDetailLoader
} from './pages/campgrounds/CampgroundDetail';
import { loader as campgroundsLoader } from './pages/campgrounds/Campgrounds';

function App() {
  const { uid, token, login, logout } = useAuth();
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
    <AuthContext.Provider value={{ uid, token, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
