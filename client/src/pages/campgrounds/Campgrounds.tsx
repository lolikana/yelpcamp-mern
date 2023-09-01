import CampgroundsList from '@components/campgrounds/CampgroundsList';
import { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';

import { TResponseCampground } from './../../components/campgrounds/types';
import styles from './Campgrounds.module.scss';

const Campgrounds = () => {
  const { campgrounds } = useLoaderData() as { campgrounds: TResponseCampground[] };
  return (
    <Suspense fallback={<p className="suspense">Loading campgrounds...</p>}>
      <Await resolve={campgrounds}>
        {(loadedCampgrounds: TResponseCampground[]) => {
          return (
            <article className={`${styles.container} page-article`}>
              <CampgroundsList campgrounds={loadedCampgrounds} />
            </article>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Campgrounds;

const loadCampgrounds = async (
  token: string
): Promise<TResponseCampground[] | { message: string }> => {
  const url = `${
    import.meta.env.PROD ? import.meta.env.VITE_SERVER_URL : ''
  }/api/campgrounds`;
  const headers = { Authorization: `Bearer ${token}` };
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const error = (await res.json()) as { message: string };
    throw new Response(error.message, { status: 500 });
  }
  return (await res.json()) as TResponseCampground[];
};
export const loader = (token: string): { data: Record<string, unknown> } => {
  return defer({
    campgrounds: loadCampgrounds(token)
  });
};
