import { Camera } from '../../types/camera';
import { formatPrice } from '../../utiils/formaters';

type PreviewModalProps = {
  preview: Camera | null;
  onCloseButtonClick: (camera: null) => void;
}

function PreviewModal({ preview, onCloseButtonClick }: PreviewModalProps) {
  if (!preview) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Добавить товар в корзину</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${preview.previewImgWebp}, ${preview.previewImgWebp2x} 2x`}
                />
                <img
                  src={preview.previewImg}
                  srcSet={`${preview.previewImg2x} 2x`}
                  width="140"
                  height="120"
                  alt={preview.name}
                />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{preview.name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул: </span>
                  <span className="basket-item__number">
                    {preview.vendorCode}
                  </span>
                </li>
                <li className="basket-item__list-item">{preview.type} фотокамера</li>
                <li className="basket-item__list-item">{preview.level} уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>
                {formatPrice(preview.price)} ₽
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
            onClick={() => onCloseButtonClick(null)}
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;
