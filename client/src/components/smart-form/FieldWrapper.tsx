import { FC } from 'react';

import { IFieldWrapper } from './types';

const FieldWrapper: FC<IFieldWrapper> = props => {
  const { name, error, children } = props;
  return (
    <div>
      <div>
        <label htmlFor={name}>{name}</label>
        {children}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default FieldWrapper;
