import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './BtnLink.module.scss';

type Props = {
  path: string;
  text: string;
};

const BtnLink: FC<Props> = props => {
  const { path, text } = props;
  return (
    <Link to={path} className={styles.btn}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </Link>
  );
};

export default BtnLink;
