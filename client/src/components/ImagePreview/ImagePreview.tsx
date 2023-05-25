import classNames from 'classnames';

import { convertStringToFileWithUrl, getFileSizeString } from 'common/helpers';

import styles from './ImagePreview.module.scss';
import { ReactComponent as ImagePlaceholder } from './assets/image-placeholder.svg';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import { ReactComponent as ChangeImageIcon } from './assets/change-photo.svg';
import { useContext } from 'react';
import {
  ImageContext,
  ImageContextType,
} from 'components/ImageUploader/ImageUploader';
import { SERVER_URL } from 'common/constants';

export enum ImagePreviewMode {
  Thumbnail = 'thumbnail',
  Large = 'large',
}

interface ImagePreviewProps {
  variant?: ImagePreviewMode;
  image: string;
  onClear: () => void;
}

export const ImagePreview = ({
  variant = ImagePreviewMode.Thumbnail,
  image,
  onClear,
}: ImagePreviewProps): JSX.Element => {
  const { imageData } = useContext(ImageContext) as ImageContextType;

  const handleClear = (): void => {
    onClear();
  };

  return (
    <div className={classNames(styles.preview, styles[variant])}>
      <figure className={styles.image}>
        {/* TODO: TAKE URL OUT OF IMAGEDATA and size */}
        {imageData ? (
          <img src={SERVER_URL + imageData} alt="Загруженное изображение" />
        ) : (
          <ImagePlaceholder className={styles.placeholder} />
        )}
      </figure>
      {/* {variant === ImagePreviewMode.Thumbnail && (
        <div className={styles.info}>
          <p className={styles.fileSize}>
            Размер файла: {getFileSizeString(size, 1)}
          </p>
        </div>
      )} */}
      <button className={styles.clearBtn} onClick={handleClear}>
        {variant === ImagePreviewMode.Thumbnail ? (
          <CloseIcon />
        ) : (
          <ChangeImageIcon />
        )}
      </button>
    </div>
  );
};
