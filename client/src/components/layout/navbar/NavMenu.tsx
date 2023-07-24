import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavMenu.module.scss';

const NavMenu: FC = () => {
  return (
    <ul className={styles.menu}>
      <li className={styles.menu__item}>
        <Link to="/campgrounds">Campgrounds</Link>
      </li>
      <li className={styles.menu__item}>
        <Link to="/login">Login</Link>
      </li>
      <li className={styles.menu__item}>
        <Link to="/signup">Signup</Link>
      </li>
    </ul>
  );
};

export default NavMenu;
