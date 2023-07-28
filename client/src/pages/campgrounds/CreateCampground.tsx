import Create from '@components/campgrounds/Create';

import styles from './CreateCampground.module.scss';

const CreateCampground = () => {
  return (
    <section className={`${styles.section} form-section`}>
      <div className="frame">
        <h2 className={styles.section__title}>Create your Camppground</h2>
        <Create />
      </div>
    </section>
  );
};

export default CreateCampground;
