import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../../types/app';
import Modal from '../../modal/modal';
import { RefObject } from 'react';
import { useAppDispatch } from '../../../hooks/store-hooks';
import { addCameraToBasket } from '../../../store/basket-slice/basket-slice';
import BasketPreview from '../../basket-preview/basket-preview';
import { BasketPreviewVariant } from '../../../consts/enums';

function PreviewModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const dispatch = useAppDispatch();
  const { preview, setPreviewDisplay, setAddItemSuccessDisplay } = useOutletContext<OutletContext>();

  const handleAddTOBasketClick = () => {
    if (!preview.camera) {
      return;
    }

    dispatch(addCameraToBasket(preview.camera));
    setAddItemSuccessDisplay(true);
    setPreviewDisplay({ isModalOpened: false, camera: preview.camera });
  };

  return (
    <Modal
      contentRef={contentRef}
      isOpened={preview.isModalOpened}
      onClose={() => setPreviewDisplay({ isModalOpened: false, camera: preview.camera })}
    >
      <p className="title title--h4">Добавить товар в корзину</p>
      <BasketPreview preview={preview.camera} variant={BasketPreviewVariant.Short}/>
      <div className="modal__buttons">
        <button
          onClick={handleAddTOBasketClick}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
          Добавить в корзину
        </button>
      </div>
    </Modal>
  );
}

export default PreviewModal;
