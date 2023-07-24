import { FC, useState } from 'react';

import styles from './Burger.module.scss';

type Props = {
  setNavMenu: () => void;
};

const Burger: FC<Props> = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  const burgerHandler = () => {
    setIsExpanded((prevState: boolean) => !prevState);
    props.setNavMenu();
  };

  return (
    <button
      data-testid="burger"
      onClick={burgerHandler}
      aria-expanded={isExpanded}
      className={styles['menu-btn']}
    >
      <div className={styles['menu-btn__burger']}></div>
    </button>
  );
};

export default Burger;
