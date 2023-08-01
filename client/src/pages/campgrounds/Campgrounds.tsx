import CampgroundsList from '@components/campgrounds/CampgroundsList';
import { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import { TResponseCampground } from './../../components/campgrounds/types';

const Campgrounds = () => {
  const { campgrounds } = useLoaderData() as { campgrounds: TResponseCampground[] };
  return (
    <Suspense fallback={<p className="suspense">Loading...</p>}>
      <Await resolve={campgrounds}>
        {(loadedCampgrounds: TResponseCampground[]) => {
          return (
            <article className={'page-article'}>
              <CampgroundsList campgrounds={loadedCampgrounds} />
            </article>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default Campgrounds;

const loadCampgrounds = async (token: string): Promise<TResponseCampground[]> => {
  const url = `${import.meta.env.VITE_PATH}${import.meta.env.VITE_PORT}/campgrounds`;
  const headers = { Authorization: `Bearer ${token}` };
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw json({ message: 'Could not fetch campgrounds' }, { status: 500 });
  } else {
    return (await res.json()) as TResponseCampground[];
  }
};

export const loader = (token: string): { data: Record<string, unknown> } => {
  return defer({
    campgrounds: loadCampgrounds(token)
  });
};
