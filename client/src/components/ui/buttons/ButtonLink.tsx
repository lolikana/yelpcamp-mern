import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './NormalButton.module.scss';

interface Props {
  path: string;
  text: string;
  style: string;
}

const ButtonLink: FC<Props> = props => {
  const { path, text, style } = props;
  return (
    <Link className={`${styles.button} ${styles[style]}`} to={path}>
      {text}
    </Link>
  );
};

export default ButtonLink;
