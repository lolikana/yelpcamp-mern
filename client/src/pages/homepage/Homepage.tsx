import { useRef } from 'react';

import useTitle from '../../hooks/use-title';
import styles from './Homepage.module.scss';

const Homepage = () => {
  const headTitleRef = useRef<string>('HOMEPAGE');
  useTitle(headTitleRef.current);

  return (
    <section className={styles.homepage}>
      <h1 data-testid="title" className={styles.title}>
        {headTitleRef.current}
      </h1>
    </section>
  );
};

export default Homepage;
