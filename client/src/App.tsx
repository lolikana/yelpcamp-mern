import '@styles/styles.scss';

import {
  CampgroundDetail,
  Campgrounds,
  CreateCampground,
  UpdateCampground
} from '@pages/campgrounds';
import Homepage from '@pages/homepage/Homepage';
import Login from '@pages/login/Login';
import ProtectedRoute from '@pages/root-layout/ProtectedRoute';
import RootLayout from '@pages/root-layout/RootLayout';
import Signup from '@pages/signup/Signup';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import { AuthContext } from './context/auth-context';
import useAuth from './hooks/use-auth';
import {
  action as deleteCampgroundAction,
  loader as campgroundDetailLoader
} from './pages/campgrounds/CampgroundDetail';
import { loader as campgroundsLoader } from './pages/campgrounds/Campgrounds';

function App() {
  const { uid, token, login, logout } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="/campgrounds"
            element={<Campgrounds />}
            loader={() => campgroundsLoader(token!)}
          />
          <Route path="/campgrounds/new-campground" element={<CreateCampground />} />
          <Route
            path="/campgrounds/:campgroundId"
            element={<CampgroundDetail />}
            id="campground-detail"
            loader={({ params }) =>
              campgroundDetailLoader(params.campgroundId as string, token!)
            }
            action={({ params }) =>
              deleteCampgroundAction(params.campgroundId as string, token!)
            }
          />
          <Route path="campgrounds/:campgroundId/update" element={<UpdateCampground />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    )
  );

  return (
    <AuthContext.Provider value={{ uid, token, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
