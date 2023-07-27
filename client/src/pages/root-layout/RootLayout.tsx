import { Layout } from '@components/layout';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default RootLayout;
