import { FC } from 'react';

import FieldWrapper from './FieldWrapper';
import { IInput } from './types';

const Input: FC<IInput> = ({ register, error, name, type }) => {
  return (
    <FieldWrapper error={error} name={name}>
      <input
        {...register!(name, { valueAsNumber: type === 'number' ? true : false })}
        name={name}
        type={type}
        min={type === 'number' ? 1 : ''}
      />
    </FieldWrapper>
  );
};

export default Input;
