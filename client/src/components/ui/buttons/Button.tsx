import { FC } from 'react';

import styles from './Button.module.scss';

interface Props {
  type: 'submit';
  text: string;
  style: 'submit';
}

const Button: FC<Props> = props => {
  const { type, text, style } = props;
  return (
    <button type={type} className={`${styles.button} ${styles[style]}`}>
      {text}
    </button>
  );
};

export default Button;
