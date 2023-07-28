import { FC } from 'react';

import FieldWrapper from './FieldWrapper';
import { ITextArea } from './types';

const TextArea: FC<ITextArea> = ({ register, error, name }) => {
  return (
    <FieldWrapper error={error} name={name}>
      <textarea {...register} name={name} />
    </FieldWrapper>
  );
};

export default TextArea;
