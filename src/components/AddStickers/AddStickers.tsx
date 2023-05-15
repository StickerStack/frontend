import { useAppDispatch } from '../../hooks/hooks';
import { TextUnderline, TitlePage } from '../UI';
import { NewSticker } from '../index';
import { setPreviewIsOpen } from '../../store/popupSlice';
import { pages, pagePrice } from '../../utils/constants';

import styles from './AddStickers.module.scss';

const AddStickers: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <TitlePage>Заказать стикеры</TitlePage>
      <NewSticker />
      <div className={styles.info}>
        <div className={styles.flex}>
          <span className={styles.text}>Количество листов А4</span>
          <span className={styles.amount}>{pages.length}</span>
        </div>
        <div className={styles.flex}>
          <span className={styles.text}>Стоимость</span>
          <div className={styles.prices}>
            <span className={styles.price}>{pagePrice * pages.length} ₽</span>
            <span className={styles.price_small}>
              {(pagePrice * pages.length) / (pages.length * 10)}₽/ за шт
            </span>
          </div>
        </div>
      </div>

      <TextUnderline
        type='button'
        className={styles.preview}
        onClick={() => dispatch(setPreviewIsOpen(true))}
      >
        Предпросмотр страницы
      </TextUnderline>
    </div>
  );
};

export { AddStickers };
