import { FC } from 'react';

import styles from './Thumbnail.module.scss';

type Props = {
  src: string | undefined;
  name: string | null;
  size: string | null;
  toggle: () => void;
};

const Thumbnail: FC<Props> = props => {
  const { src, name, size, toggle } = props;
  return (
    <div className={styles.thumbnail}>
      <ul>
        <li>
          <div className={styles.views}>
            <div className={styles.views__img}>
              <img src={src} alt="img" />
            </div>
            <div className={styles.views__content}>
              <div className={styles.views__content_name}>
                <h2>{name}</h2>
                <h3>{size} MB</h3>
              </div>
              <button type="button" onClick={toggle}>
                x
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Thumbnail;
