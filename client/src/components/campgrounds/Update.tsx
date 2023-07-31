import { Input, SmartForm } from '@components/smart-form';
import TextArea from '@components/smart-form/TextArea';
import Button from '@components/ui/buttons/Button';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { CampgroundValidation } from '../../libs/validations';
import { AuthContext } from './../../context/auth-context';
import { useHttpClient } from './../../hooks/use-http';
import { TCampground, TResponseCampground } from './types';

const Update = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const campgroundId = useParams().campgroundId;
  const [campground, setCampground] = useState<TCampground | undefined>();
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        const url = `${import.meta.env.VITE_PATH}${
          import.meta.env.VITE_PORT
        }/campgrounds/${campgroundId}`;
        const headers = { Authorization: `Bearer ${auth.token}` };
        const res = (await sendRequest({ url, headers })) as TResponseCampground;
        setCampground({
          title: res.title,
          location: res.location,
          description: res.description,
          price: res.price.toString()
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchCampground().catch(err => console.log(err));
  }, [campgroundId, auth.token]);

  const onSubmit = async (data: TCampground) => {
    try {
      const url = `${import.meta.env.VITE_PATH}${
        import.meta.env.VITE_PORT
      }/campgrounds/${campgroundId}`;
      const method = 'PATCH';
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`
      };
      const body = JSON.stringify({ ...data });
      const res = (await sendRequest({ url, method, headers, body })) as {
        campgroundId: string;
      };
      navigate(`/campgrounds/${res.campgroundId}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!campground) return <p>No campground with this id</p>;

  return (
    <SmartForm<TCampground>
      onSubmit={onSubmit}
      validationSchema={CampgroundValidation}
      cancelLink="/campgrounds"
      options={{ defaultValues: campground }}
    >
      <Input name="title" />
      <Input name="location" />
      <TextArea name="description" />
      <Input name="price" type="number" />
      <Button type="submit" text="Submit" style="submit" />
    </SmartForm>
  );
};

export default Update;
