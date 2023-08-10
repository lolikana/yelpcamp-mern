import { FC } from 'react';

import styles from './Button.module.scss';

interface Props {
  type: 'submit';
  text: string;
  style: 'submit';
  disabled?: boolean;
}

const Button: FC<Props> = props => {
  const { type, text, style, disabled } = props;
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[style]}`}
      disabled={disabled}
    >
      {!disabled ? text : 'Loading...'}
    </button>
  );
};

export default Button;
