import { Input, SmartForm } from '@components/smart-form';
import TextArea from '@components/smart-form/TextArea';
import Button from '@components/ui/buttons/Button';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CampgroundValidation } from '../../libs/validations';
import { AuthContext } from './../../context/auth-context';
import { useHttpClient } from './../../hooks/use-http';
import { TCampground } from './types';

const Create = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();
  const onSubmit = async (data: TCampground) => {
    try {
      const url = `${import.meta.env.VITE_PATH}${import.meta.env.VITE_PORT}/campgrounds`;
      const method = 'POST';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`
      };
      const body = JSON.stringify({ ...data, author: auth.uid as string });
      const res = (await sendRequest({ url, method, headers, body })) as {
        compgroundId: string;
      };
      navigate(`/${res.compgroundId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SmartForm<TCampground>
      onSubmit={onSubmit}
      validationSchema={CampgroundValidation}
      cancelLink="/campgrounds"
    >
      <Input name="title" />
      <Input name="location" />
      <TextArea name="description" />
      <Input name="price" type="number" />
      <Button type="submit" text="Submit" style="submit" />
    </SmartForm>
  );
};

export default Create;
