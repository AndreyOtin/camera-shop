import React, { RefObject } from 'react';
import Modal from '../../modal/modal';
import { Link, useMatch, useNavigate, useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../../types/app';
import { AppRoute } from '../../../consts/enums';

function AddItemSuccessModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const { setAddItemSuccessDisplay, isAddItemSuccessOpened } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const isCatalog = useMatch(AppRoute.Catalog);

  const handleContinueClick = () => {
    setAddItemSuccessDisplay(false);

    if (!isCatalog) {
      navigate(AppRoute.Catalog);
    }
  };

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
        <button
          onClick={handleContinueClick}
          className="btn btn--transparent modal__btn"
        >
          Продолжить
          покупки
        </button>
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
