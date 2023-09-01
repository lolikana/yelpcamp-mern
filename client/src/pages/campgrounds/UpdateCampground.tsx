import CampgroundForm from '@components/campgrounds/CampgroundForm';
import { Suspense } from 'react';
import { Await, useRouteLoaderData } from 'react-router-dom';

import { TCampground, TResponseCampground } from './../../components/campgrounds/types';
import styles from './CreateCampground.module.scss';

const UpdateCampground = () => {
  const campground = useRouteLoaderData('campground-update') as {
    campground: TResponseCampground;
  };

  return (
    <section className={`${styles.section} form-section`}>
      <div className="frame">
        <h2 className={styles.section__title}>Create your Camppground</h2>
        <Suspense fallback={<p className="suspense">Loading info campground...</p>}>
          <Await
            resolve={campground.campground}
            errorElement={
              <p className="suspense">No campground with this id was found.</p>
            }
          >
            {(loadedCampground: TCampground) => (
              <CampgroundForm method="PATCH" defaultValues={loadedCampground} />
            )}
          </Await>
        </Suspense>
      </div>
    </section>
  );
};

export default UpdateCampground;
