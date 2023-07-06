import Modal from '../../modal/modal';
import { useAppDispatch, useAppSelector } from '../../../hooks/store-hooks';
import { changePostStatus, selectPostStatus } from '../../../store/comments-slice/comments-slice';
import { Status } from '../../../consts/enums';
import { RefObject } from 'react';

function ReviewSuccessModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const status = useAppSelector(selectPostStatus);
  const dispatch = useAppDispatch();

  return (
    <Modal
      variant='narrow'
      contentRef={contentRef}
      isOpened={status === Status.Success}
      onClose={() => dispatch(changePostStatus(Status.Idle))}
    >
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          onClick={() => dispatch(changePostStatus(Status.Idle))}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </button>
      </div>
    </Modal>
  );
}

export default ReviewSuccessModal;
