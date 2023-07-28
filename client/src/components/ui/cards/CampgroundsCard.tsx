import { Link } from 'react-router-dom';

import ButtonLink from '../buttons/ButtonLink';
import LocationIcon from '../icons/LocationIcon';
import { TResponseCampground } from './../../campgrounds/types';
import styles from './CampgroundsCard.module.scss';

const CampgroundsCard = (props: { campground: TResponseCampground }) => {
  const { _id, title, images, location, description } = props.campground;

  return (
    <div className={styles.card}>
      <Link to={`/campgrounds/${_id}`} className={styles.card__image}>
        <img src={images[0].url} alt="" />
      </Link>
      <div className={styles.card__text}>
        <div className={styles.card__text_top}>
          <h3>{title}</h3>
          <a
            href={`http://maps.google.com/?q=${location}`}
            target="_blank"
            rel="noreferrer"
          >
            <LocationIcon />
            <em>{location}</em>
          </a>
        </div>
        <div className={styles.card__text_description}>
          <p>{description}</p>
        </div>
        <div>
          <ButtonLink path={`/${_id}`} text="View more" style="blue" />
        </div>
      </div>
    </div>
  );
};

export default CampgroundsCard;
