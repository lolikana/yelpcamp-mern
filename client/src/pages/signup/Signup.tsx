import { Layout } from '@components/layout';
import { useRef } from 'react';

import useTitle from '../../hooks/use-title';
import styles from './Signup.module.scss';

const Signup = () => {
  const headTitleRef = useRef<string>('Signup');
  useTitle(headTitleRef.current);

  return (
    <Layout>
      <div>
        <h1 data-testid="title" className={styles.title}>
          {headTitleRef.current}
        </h1>
      </div>
    </Layout>
  );
};

export default Signup;
