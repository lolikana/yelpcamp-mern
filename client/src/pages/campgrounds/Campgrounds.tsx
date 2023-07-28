import { TCampground } from '@components/campgrounds/types';
import { useEffect, useState } from 'react';

import { useHttpClient } from './../../hooks/use-http';

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState<TCampground[]>([]);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const url = `${import.meta.env.VITE_PATH}${
          import.meta.env.VITE_PORT
        }/campgrounds`;
        const res = (await sendRequest({ url: url })) as TCampground[];
        setCampgrounds(res);
        console.log(res);
        console.log(campgrounds);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCampgrounds().catch(err => console.log(err));
  }, []);

  return (
    <div>
      <ul>
        {/* {campgrounds.map(campground => (
          <li key={campground.title}>{campground.title}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default Campgrounds;
