import React, { RefObject } from 'react';
import Modal from '../../modal/modal';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../../types/app';

function BuyErrorModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const { isBuyErrorOpened, setBuyErrorDisplay } = useOutletContext<OutletContext>();

  return (
    <Modal
      variant='narrow'
      isOpened={isBuyErrorOpened}
      onClose={() => {
        setBuyErrorDisplay(false);
      }}
      contentRef={contentRef}
    >
      <p className="title title--h4">Не удалось осуществить покупку</p>
      <p className="title title--h4">Попробуйте ввести купон: camera-333 или camera-444.</p>
      <svg
        style={{ transform: 'rotate(180deg)' }}
        className="modal__icon"
        width="80"
        height="78"
        aria-hidden="true"
      >
        <use color='red' xlinkHref="#icon-review-error"></use>
      </svg>
      <div className="modal__buttons">
        <button
          onClick={() => setBuyErrorDisplay(false)}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться в корзину
        </button>
      </div>
    </Modal>
  );
}

export default BuyErrorModal;
