import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './ReflectLink.module.scss';

type Props = {
  path: string;
  text: string;
  color: string;
};

const ReflectLink: FC<Props> = props => {
  const { path, text, color } = props;
  return (
    <Link to={path} className={`${styles.btn} ${styles[color]}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {text}
    </Link>
  );
};

export default ReflectLink;
