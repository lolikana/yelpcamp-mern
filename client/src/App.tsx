import '@styles/styles.scss';

import Homepage from '@pages/homepage/Homepage';
import Login from '@pages/login/Login';
import RootLayout from '@pages/root-layout/RootLayout';
import Signup from '@pages/signup/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
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

  return <RouterProvider router={router} />;
}

export default App;
