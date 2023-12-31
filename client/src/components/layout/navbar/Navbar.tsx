import Burger from '@components/ui/burger/Burger';
import { useState } from 'react';

import styles from './Navbar.module.scss';
import NavMenu from './NavMenu';

const Navbar = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    document.getElementById('resize-stopper')!.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document
        .getElementById('resize-stopper')!
        .classList.remove('resize-animation-stopper');
    }, 400);
  });

  return (
    <nav id="resize-stopper" className={styles.nav}>
      <Burger setNavMenu={() => setIsHidden(prev => !prev)} />
      <NavMenu isHidden={isHidden} />
    </nav>
  );
};

export default Navbar;
