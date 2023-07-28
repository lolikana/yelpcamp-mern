import NormalButton from '@components/ui/buttons/NormalButton';
import { FC, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from './../../../context/auth-context';
import styles from './NavMenu.module.scss';

const NavMenu: FC<{ isHidden: boolean }> = ({ isHidden }) => {
  const auth = useContext(AuthContext);

  return (
    <ul aria-hidden={isHidden} className={styles.menu}>
      {auth.token ? (
        <>
          <li className={styles.menu__item}>
            <Link to="/campgrounds">Campgrounds</Link>
          </li>
          <li>
            <NormalButton text="Logout" style="cancel" onClick={auth.logout} />
          </li>
        </>
      ) : (
        <>
          <li className={styles.menu__item}>
            <Link to="/login">Login</Link>
          </li>
          <li className={styles.menu__item}>
            <Link to="/signup">Signup</Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavMenu;
