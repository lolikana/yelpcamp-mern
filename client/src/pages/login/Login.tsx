import { Layout } from '@components/layout';
import { useRef } from 'react';

import useTitle from '../../hooks/use-title';
import classes from './Login.module.scss';

const Login = () => {
  const headTitleRef = useRef<string>('Login');
  useTitle(headTitleRef.current);

  return (
    <Layout>
      <section className={classes.login}>
        <h1 data-testid="title" className={classes.title}>
          {headTitleRef.current}
        </h1>
      </section>
    </Layout>
  );
};

export default Login;
