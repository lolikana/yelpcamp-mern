import CampLogo from '@assets/logo/yelpcamp.png';
import { useNavigate } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <header data-testid="header-component" className={styles.header}>
        <div className={styles.header__logo} onClick={() => navigate('/')}>
          <img src={CampLogo} alt="Logo website" />
          <span className={styles.header__logo_text}>YourCampSite</span>
        </div>
      </header>
      <Navbar />
    </>
  );
};

export default Header;
