import { FC } from 'react';

import styles from './NormalButton.module.scss';

interface Props {
  text: string;
  style: string;
  onClick: () => void;
}
const NormalButton: FC<Props> = props => {
  const { text, style, onClick } = props;
  return (
    <button className={`${styles.button} ${styles[style]}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default NormalButton;
