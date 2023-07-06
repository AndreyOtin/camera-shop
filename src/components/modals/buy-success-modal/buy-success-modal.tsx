import React, { RefObject } from 'react';
import Modal from '../../modal/modal';
import { Link, useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../../types/app';
import { AppRoute } from '../../../consts/enums';

function BuySuccessModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const { isBuySuccessOpened, setBuySuccessDisplay } = useOutletContext<OutletContext>();

  return (
    <Modal
      variant='narrow'
      isOpened={isBuySuccessOpened}
      onClose={() => {
        setBuySuccessDisplay(false);
      }}
      contentRef={contentRef}
    >
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link
          onClick={() => setBuySuccessDisplay(false)}
          to={AppRoute.Catalog}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </Link>
      </div>
    </Modal>
  );
}

export default BuySuccessModal;
