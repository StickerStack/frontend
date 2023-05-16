import cn from 'classnames';

import { ButtonWithText } from '../UI';

import { ReactComponent as Pic } from '../../images/icons/upload-image.svg';
import { ReactComponent as Bin } from '../../images/icons/bin.svg';
import styles from './ImagePick.module.scss';

interface IProps {
  image?: string;
  className?: string;
}

const ImagePick: React.FC<IProps> = ({ image, className }: IProps) => {
  return (
    <div className={cn(styles.avatar, className)}>
      <img className={styles.image} alt='Изображение' src={image} />
      <form className={styles.overlay}>
        <ButtonWithText type='button' theme='no-border' className={styles.button}>
          <Pic />
          <label htmlFor='myimage' className={styles.label}>
            Загрузить изображение
          </label>
        </ButtonWithText>
        <input
          type='file'
          name='file'
          id='myimage'
          accept='image/*'
          className={styles.input}
        ></input>
        <ButtonWithText type='button' theme='no-border' className={styles.button}>
          <Bin />
          Удалить изображение
        </ButtonWithText>
      </form>
    </div>
  );
};

export { ImagePick };
