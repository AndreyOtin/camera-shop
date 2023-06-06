import Modal from '../modal/modal';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { changePostStatus, selectPostStatus } from '../../store/comments-slice/comments-slice';
import { Status } from '../../consts/enums';

function ReviewSuccessModal() {
  const status = useAppSelector(selectPostStatus);
  const dispatch = useAppDispatch();

  if (status !== Status.Success) {
    return null;
  }

  return (
    <Modal onClickOutside={() => dispatch(changePostStatus())}>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          onClick={() => dispatch(changePostStatus())}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </button>
      </div>
      <button
        onClick={() => dispatch(changePostStatus())}
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

export default ReviewSuccessModal;
