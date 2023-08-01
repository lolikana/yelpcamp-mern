import CampgroundForm from '@components/campgrounds/CampgroundForm';

import styles from './CreateCampground.module.scss';

const CreateCampground = () => {
  return (
    <section className={`${styles.section} form-section`}>
      <div className="frame">
        <h2 className={styles.section__title}>Create your Camppground</h2>
        <CampgroundForm method="POST" />
      </div>
    </section>
  );
};

export default CreateCampground;
