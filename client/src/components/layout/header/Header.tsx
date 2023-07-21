import CampLogo from '@assets/logo/yelpcamp.png';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header data-testid="header-component" className={styles.header}>
      <div className={styles.logo} onClick={() => navigate('/')}>
        <img src={CampLogo} alt="Logo website" />
        <span>YourCampSite</span>
      </div>
    </header>
  );
};

export default Header;
