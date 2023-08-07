import CampgroundCard from '@components/ui/cards/CampgroundCard';
import { Suspense } from 'react';
import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
  useSubmit
} from 'react-router-dom';

import { TResponseCampground } from './../../components/campgrounds/types';
import styles from './CampgroundDetail.module.scss';

const CampgroundDetail = () => {
  const submit = useSubmit();
  const { campground } = useRouteLoaderData('campground-detail') as {
    campground: TResponseCampground;
  };

  return (
    <Suspense fallback={<p className="suspense">Loading campground...</p>}>
      <Await resolve={campground}>
        {(loadedCampground: TResponseCampground) => (
          <article className={`${styles.container} page-article`}>
            <CampgroundCard
              campground={loadedCampground}
              onDelete={() => submit(null, { method: 'delete' })}
            />
          </article>
        )}
      </Await>
    </Suspense>
  );
};

export default CampgroundDetail;

const loadCampground = async (
  id: string,
  token: string
): Promise<TResponseCampground> => {
  const url = `/api/campgrounds/${id}`;
  const headers = { Authorization: `Bearer ${token}` };
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw json({ message: 'Could not fetch campgrounds' }, { status: 500 });
  } else {
    return (await res.json()) as TResponseCampground;
  }
};

export const loader = (id: string, token: string): { data: Record<string, unknown> } => {
  return defer({
    campground: loadCampground(id, token)
  });
};

export const action = async (id: string, token: string): Promise<Response> => {
  const url = `/api/campgrounds/${id}`;
  const method = 'DELETE';
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const res = await fetch(url, { method, headers });
  if (!res.ok) {
    throw json({ message: 'Could not delete event' }, { status: 500 });
  }
  return redirect('/campgrounds');
};
