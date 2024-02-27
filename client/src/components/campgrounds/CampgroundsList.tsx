import CampgroundsCard from '../ui/cards/CampgroundsCard';
import styles from './CampgroundsList.module.scss';
import { TResponseCampground } from './types';

const CampgroundsList = (props: { campgrounds: TResponseCampground[] }) => {
  const { campgrounds } = props;
  return (
    <ul className={styles.items}>
      {campgrounds.length === 0 ? (
        <li>No campgrounds found</li>
      ) : (
        <>
          {campgrounds.map(campground => (
            <li key={campground.id} className={`${styles.item} frame`}>
              <CampgroundsCard campground={campground} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
};

export default CampgroundsList;
