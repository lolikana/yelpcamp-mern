import { useContext, useEffect, useState } from 'react';

import { AuthContext } from './../../context/auth-context';
import { useHttpClient } from './../../hooks/use-http';
import { TResponseCampground } from './../campgrounds/types';
import CampgroundsCard from './../ui/cards/CampgroundsCard';
import styles from './ReadAll.module.scss';

const ReadAll = () => {
  const auth = useContext(AuthContext);
  const [campgrounds, setCampgrounds] = useState<TResponseCampground[]>([]);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const url = `${import.meta.env.VITE_PATH}${
          import.meta.env.VITE_PORT
        }/campgrounds`;
        const headers = { Authorization: `Bearer ${auth.token}` };
        const res = (await sendRequest({ url, headers })) as TResponseCampground[];
        setCampgrounds(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCampgrounds().catch(err => console.log(err));
  }, []);
  return (
    <ul className={styles.items}>
      {campgrounds.length === 0 ? (
        <li>No campgrounds found</li>
      ) : (
        <>
          {campgrounds.map(campground => (
            <li key={campground._id} className={`${styles.item} frame`}>
              <CampgroundsCard campground={campground} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default ReadAll;
