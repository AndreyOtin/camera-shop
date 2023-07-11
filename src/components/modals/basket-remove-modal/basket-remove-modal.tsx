import React, { RefObject } from 'react';
import Modal from '../../modal/modal';
import { Link, useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../../types/app';
import BasketPreview from '../../basket-preview/basket-preview';
import { removeCameraFromBasket } from '../../../store/basket-slice/basket-slice';
import { useAppDispatch } from '../../../hooks/store-hooks';
import { BasketPreviewVariant } from '../../../consts/enums';

function BasketRemoveModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const { preview, setPreviewDisplay } = useOutletContext<OutletContext>();
  const dispatch = useAppDispatch();

  const handleRemoveFromBasketClick = () => {
    if (!preview.camera) {
      return;
    }

    dispatch(removeCameraFromBasket(preview.camera));
    setPreviewDisplay({ isModalOpened: false, camera: preview.camera });
  };

  return (
    <Modal
      contentRef={contentRef}
      isOpened={preview.isModalOpened}
      onClose={() => setPreviewDisplay({ isModalOpened: false, camera: preview.camera })}
    >
      <p className="title title--h4">Удалить этот товар?</p>
      <BasketPreview preview={preview.camera} variant={BasketPreviewVariant.BasketModal}/>
      <div className="modal__buttons">
        <button
          onClick={handleRemoveFromBasketClick}
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
        >
          Удалить
        </button>
        <Link
          onClick={() => setPreviewDisplay({ isModalOpened: false, camera: preview.camera })}
          className="btn btn--transparent modal__btn modal__btn--half-width"
          to="#"
        >
          Продолжить покупки
        </Link>
      </div>
    </Modal>
  );
}

export default BasketRemoveModal;
