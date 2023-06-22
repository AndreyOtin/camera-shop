import { formatPrice } from '../../utiils/formaters';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../types/app';
import Modal from '../modal/modal';
import { RefObject } from 'react';

function PreviewModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const { preview, setPreviewDisplay } = useOutletContext<OutletContext>();

  return (
    <Modal
      contentRef={contentRef}
      isOpened={preview.isModalOpened}
      onClickOutside={() => setPreviewDisplay({ isModalOpened: false, camera: preview.camera })}
    >
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`${preview?.camera?.previewImgWebp || ''}, ${preview?.camera?.previewImgWebp2x || ''} 2x`}
            />
            <img
              src={preview?.camera?.previewImg || ''}
              srcSet={`${preview?.camera?.previewImg2x || ''} 2x`}
              width="140"
              height="120"
              alt={preview?.camera?.name}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{preview?.camera?.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">
                {preview?.camera?.vendorCode}
              </span>
            </li>
            <li
              className="basket-item__list-item"
            >
              {preview?.camera?.type} {preview?.camera?.category.toLocaleLowerCase()}
            </li>
            <li className="basket-item__list-item">{preview?.camera?.level} уровень</li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(preview?.camera?.price || 0)} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
          Добавить в корзину
        </button>
      </div>
      <button
        onClick={() => setPreviewDisplay({ isModalOpened: false, camera: preview.camera })}
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </Modal>
  );
}

export default PreviewModal;
