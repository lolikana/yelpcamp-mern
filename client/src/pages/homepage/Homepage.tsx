import ReflectLink from '@components/ui/buttons/ReflectLink';
import { useContext, useRef } from 'react';

import { AuthContext } from './../../context/auth-context';
import useTitle from './../../hooks/use-title';
import styles from './Homepage.module.scss';

const Homepage = () => {
  const auth = useContext(AuthContext);
  const headTitleRef = useRef<string>('HOMEPAGE');
  useTitle(headTitleRef.current);

  return (
    <section className={styles.homepage}>
      <div className={`${styles.homepage__presentation} frame`}>
        <h1 className={styles.homepage__presentation_title}>Welcome to Yelpcamp!</h1>
        <p>
          Jump right in and explore our many campgrounds. Feel free to share some of your
          own and comment on others!
        </p>
        <div className={styles.homepage__presentation_btns}>
          {auth.token ? (
            <ReflectLink path="/campgrounds" text="Campgrounds" color="primary" />
          ) : (
            <>
              <ReflectLink path="/login" text="login" color="main" />
              <ReflectLink path="/signup" text="signup" color="primary" />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
