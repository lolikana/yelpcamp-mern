import { useRef } from 'react';

import useTitle from '../../hooks/use-title';
import styles from './Homepage.module.scss';

const Homepage = () => {
  const headTitleRef = useRef<string>('HOMEPAGE');
  useTitle(headTitleRef.current);

  return (
    <section className={`${styles.homepage} section-page`}>
      <div className={styles.homepage__presentation}>
        <h1 className={styles.homepage__presentation_title}>Welcome to Yelpcamp!</h1>
        <p>
          Jump right in and explore our many campgrounds. Feel free to share some of your
          own and comment on others!
        </p>
      </div>
    </section>
  );
};

export default Homepage;
