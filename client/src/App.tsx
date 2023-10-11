import '@styles/styles.scss';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  CampgroundDetail,
  Campgrounds,
  CreateCampground,
  UpdateCampground
} from '@pages/campgrounds';
import Homepage from '@pages/homepage/Homepage';
import Login from '@pages/login/Login';
import NotFound from '@pages/NotFound';
import RootLayout from '@pages/root-layout/RootLayout';
import Signup from '@pages/signup/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthContext } from './context/auth-context';
import useAuth from './hooks/use-auth';
import ProtectedRoute from './libs/ProtectedRoute';
import {
  action as deleteCampgroundAction,
  loader as campgroundDetailLoader
} from './pages/campgrounds/CampgroundDetail';
import { loader as campgroundsLoader } from './pages/campgrounds/Campgrounds';

function App() {
  const { uid, token, login, logout } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Homepage />
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: 'campgrounds',
              children: [
                {
                  index: true,
                  element: <Campgrounds />,
                  loader: () => campgroundsLoader(token!)
                },
                {
                  path: 'new-campground',
                  element: <CreateCampground />,
                  loader: () => null // if loader is not specified, refresh the page redirect to index page
                },
                {
                  path: ':campgroundId',
                  children: [
                    {
                      index: true,
                      id: 'campground-detail',
                      element: <CampgroundDetail />,
                      loader: ({ params }) =>
                        campgroundDetailLoader(params.campgroundId as string, token!),
                      action: ({ params }) =>
                        deleteCampgroundAction(params.campgroundId as string, token!)
                    },
                    {
                      path: 'update',
                      id: 'campground-update',
                      element: <UpdateCampground />,
                      loader: ({ params }) =>
                        campgroundDetailLoader(params.campgroundId as string, token!)
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: '*',
          element: <NotFound />
        }
      ]
    }
  ]);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route path="/" element={<RootLayout />}>
  //       <Route index element={<Homepage />} />
  //       <Route element={<ProtectedRoute />}>
  //         <Route path="campgrounds">
  //           <Route
  //             index
  //             element={<Campgrounds />}
  //             loader={() => campgroundsLoader(token!)}
  //           />
  //           <Route
  //             path="new-campground"
  //             element={<CreateCampground />},
  //             loader={() => null}
  //           />
  //           <Route path=":campgroundId">
  //             <Route
  //               index
  //               id="campground-detail"
  //               element={<CampgroundDetail />}
  //               loader={({ params }) =>
  //                 campgroundDetailLoader(params.campgroundId as string, token!)
  //               }
  //               action={({ params }) =>
  //                 deleteCampgroundAction(params.campgroundId as string, token!)
  //               }
  //             />
  //             <Route
  //               path="update"
  //               id="campground-update"
  //               element={<UpdateCampground />}
  //               loader={({ params }) =>
  //                 campgroundDetailLoader(params.campgroundId as string, token!)
  //               }
  //             />
  //           </Route>
  //         </Route>
  //       </Route>
  //       <Route path="login" element={<Login />} />
  //       <Route path="signup" element={<Signup />} />

  //       <Route path="*" element={<NotFound />} />
  //     </Route>
  //   )
  // );

  return (
    <AuthContext.Provider value={{ uid, token, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
