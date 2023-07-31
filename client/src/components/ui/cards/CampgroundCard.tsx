import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { TResponseCampground } from '../../campgrounds/types';
import ButtonLink from '../buttons/ButtonLink';
import NormalButton from '../buttons/NormalButton';
import LocationIcon from '../icons/LocationIcon';
import styles from './CampgroundCard.module.scss';

interface Props {
  campground: TResponseCampground | null;
  onDelete: () => void;
}

const CampgroundCard = (props: Props) => {
  if (props.campground === null) return <p>No campground found</p>;

  const { title, images, location, description, price } = props.campground;

  return (
    <div className={`${styles.card} frame`}>
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
      <div className={styles.card__image}>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {images.map(image => (
            <SwiperSlide key={image.url}>
              <img src={image.url} alt={image.filename} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.card__text_bottom}>
        <div>
          <p className={styles.card__price}>${price} / night</p>
          <p>{description}</p>
        </div>
        <div className={styles.card__buttons}>
          <div>
            <ButtonLink path={`/campgrounds`} text="Edit" style="blue" />
            <NormalButton text="Delete" style="cancel" onClick={props.onDelete} />
          </div>
          <ButtonLink path={`/campgrounds`} text="Back to list" style="orange" />
        </div>
      </div>
    </div>
  );
};

export default CampgroundCard;
