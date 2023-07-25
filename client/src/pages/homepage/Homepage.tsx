import BtnLink from '@components/ui/buttons/BtnLink';
import { useRef } from 'react';

import useTitle from './../../hooks/use-title';
import styles from './Homepage.module.scss';

const Homepage = () => {
  const headTitleRef = useRef<string>('HOMEPAGE');
  useTitle(headTitleRef.current);

  return (
    <section className={styles.homepage}>
      <div className={styles.homepage__presentation}>
        <h1 className={styles.homepage__presentation_title}>Welcome to Yelpcamp!</h1>
        <p>
          Jump right in and explore our many campgrounds. Feel free to share some of your
          own and comment on others!
        </p>
        <BtnLink path="/campgrounds" text="Campgrounds" />
      </div>
    </section>
  );
};

export default Homepage;
