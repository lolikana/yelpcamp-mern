import CampgroundCard from '@components/ui/cards/CampgroundCard';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TResponseCampground } from './../../components/campgrounds/types';
import { AuthContext } from './../../context/auth-context';
import { useHttpClient } from './../../hooks/use-http';
import styles from './CampgroundDetail.module.scss';

const CampgroundDetail = () => {
  const auth = useContext(AuthContext);
  const campgroundId = useParams().campgroundId;
  const [campground, setCampground] = useState<TResponseCampground | null>(null);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        const url = `${import.meta.env.VITE_PATH}${
          import.meta.env.VITE_PORT
        }/campgrounds/${campgroundId}`;
        const headers = { Authorization: `Bearer ${auth.token}` };
        const res = (await sendRequest({ url, headers })) as TResponseCampground;
        setCampground(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCampground().catch(err => console.log(err));
  }, []);
  return (
    <article className={`${styles.container} page-article`}>
      <CampgroundCard campground={campground} />
    </article>
  );
};

export default CampgroundDetail;
