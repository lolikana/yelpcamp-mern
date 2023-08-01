import { Input, SmartForm } from '@components/smart-form';
import TextArea from '@components/smart-form/TextArea';
import Button from '@components/ui/buttons/Button';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import { useHttpClient } from '../../hooks/use-http';
import { CampgroundValidation } from '../../libs/validations';
import { TCampground } from './types';

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
      const url = `${import.meta.env.VITE_PATH}${import.meta.env.VITE_PORT}/campgrounds${
        method === 'PATCH' ? '/' + campgroundId : ''
      }`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`
      };
      const body =
        method === 'PATCH'
          ? JSON.stringify({ ...data, price: +data.price })
          : JSON.stringify({ ...data, price: +data.price, author: auth.uid as string });
      const res = (await sendRequest({ url, method, headers, body })) as {
        campgroundId: string;
      };
      navigate(`/campgrounds/${res.campgroundId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SmartForm<TCampground>
      onSubmit={onSubmit}
      validationSchema={CampgroundValidation}
      cancelLink="/campgrounds"
      options={{
        defaultValues: method === 'PATCH' ? defaultValues : undefined
      }}
    >
      <Input name="title" />
      <Input name="location" />
      <TextArea name="description" />
      <Input name="price" type="number" />
      <Button type="submit" text="Submit" style="submit" />
    </SmartForm>
  );
};

export default CampgroundForm;

// export const action = async (
//   method: 'POST' | 'PATCH',
//   id: string | null,
//   uid: string,
//   data: TCampground,
//   token: string
// ): Promise<Response> => {
//   const campground = data;
//   const url = `${import.meta.env.VITE_PATH}${import.meta.env.VITE_PORT}/campgrounds${
//     method === 'PATCH' ? '/' + id : ''
//   }`;
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`
//   };
//   const body =
//     method === 'PATCH'
//       ? JSON.stringify({ ...campground })
//       : JSON.stringify({ ...campground, author: uid });
//   const res = await fetch(url, { method, headers, body });
//   if (!res.ok) {
//     // eslint-disable-next-line @typescript-eslint/no-throw-literal
//     throw json({ message: 'Could not save campground.' }, { status: 500 });
//   }
//   return redirect(`/campgrounds/${res.campgroundId}`);
// };
