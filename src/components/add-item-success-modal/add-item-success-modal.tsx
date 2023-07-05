import React, { RefObject } from 'react';
import Modal from '../modal/modal';
import { Link, useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../types/app';
import { AppRoute } from '../../consts/enums';

function AddItemSuccessModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const { setAddItemSuccessDisplay, isAddItemSuccessOpened } = useOutletContext<OutletContext>();

  return (
    <Modal
      variant='narrow'
      isOpened={isAddItemSuccessOpened}
      onClose={() => {
        setAddItemSuccessDisplay(false);
      }}
      contentRef={contentRef}
    >
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <Link
          to={AppRoute.Catalog}
          onClick={() => setAddItemSuccessDisplay(false)}
          className="btn btn--transparent modal__btn"
        >
          Продолжить
          покупки
        </Link>
        <Link
          onClick={() => setAddItemSuccessDisplay(false)}
          to={AppRoute.Basket}
          className="btn btn--purple modal__btn modal__btn--fit-width"
        >
          Перейти в корзину
        </Link>
      </div>
    </Modal>
  );
}

export default AddItemSuccessModal;
