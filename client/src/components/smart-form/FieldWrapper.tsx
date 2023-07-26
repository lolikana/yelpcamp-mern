import { FC } from 'react';

import styles from './FieldWrapper.module.scss';
import { IFieldWrapper } from './types';

const FieldWrapper: FC<IFieldWrapper> = props => {
  const { name, error, children } = props;
  return (
    <div className={`${styles.container} ${error ? styles.invalid : ''}`}>
      <label htmlFor={name}>{name}</label>
      {children}
      {error && <p className={styles.container__error}>{error}</p>}
    </div>
  );
};

export default FieldWrapper;
