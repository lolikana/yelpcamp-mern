import styles from './Navbar.module.scss';
import NavMenu from './NavMenu';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <NavMenu />
    </nav>
  );
};

export default Navbar;
