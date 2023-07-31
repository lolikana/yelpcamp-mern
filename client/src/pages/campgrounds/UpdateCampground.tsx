import Update from '@components/campgrounds/Update';

import styles from './CreateCampground.module.scss';

const UpdateCampground = () => {
  return (
    <section className={`${styles.section} form-section`}>
      <div className="frame">
        <h2 className={styles.section__title}>Create your Camppground</h2>
        <Update />
      </div>
    </section>
  );
};

export default UpdateCampground;
