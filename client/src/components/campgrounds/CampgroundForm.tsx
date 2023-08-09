import { Input, InputFiles, SmartForm } from '@components/smart-form';
import TextArea from '@components/smart-form/TextArea';
import Button from '@components/ui/buttons/Button';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/use-http';
import { CampgroundValidation } from '../../libs/validations';
import { TCampground } from './types';

const defaultValuees: TCampground = {
  title: 'test',
  location: 'test',
  description: 'test',
  price: '24'
};

const CampgroundForm = ({
  method,
  defaultValues
}: {
  method: 'POST' | 'PATCH';
  defaultValues?: TCampground;
}) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const campgroundId = useParams().campgroundId;
  const { sendRequest } = useHttpClient();

  const onSubmit = async (data: TCampground) => {
    try {
      const url = `/api/campgrounds${method === 'PATCH' ? '/' + campgroundId : ''}`;
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${auth.token}`
      };

      const { images, ...item } = data;
      const productsData = { ...item };

      const formData = new FormData();
      for (const [key, value] of Object.entries(productsData)) {
        formData.append(key, value);
      }
      if (images) {
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }
      const body = formData;
      console.log(Array.from(formData));
      // const body = JSON.stringify({ ...data });
      (await sendRequest({ url, method, headers, body })) as {
        campgroundId: string;
      };
      navigate(`/campgrounds`);
    } catch (err) {
      console.log('Submit error:', err);
    }
  };

  return (
    <SmartForm<TCampground>
      onSubmit={onSubmit}
      validationSchema={CampgroundValidation}
      cancelLink="/campgrounds"
      options={{
        defaultValues: method === 'PATCH' ? defaultValues : defaultValuees
      }}
    >
      <Input name="title" />
      <Input name="location" />
      <TextArea name="description" />
      <Input name="price" type="number" />
      <InputFiles name="images" />
      <Button type="submit" text="Submit" style="submit" />
    </SmartForm>
  );
};

export default CampgroundForm;
