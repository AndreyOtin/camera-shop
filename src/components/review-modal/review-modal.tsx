import Modal from '../modal/modal';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../types/app';
import ReviewForm from '../review-form/review-form';
import { RefObject } from 'react';

function ReviewModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const { isReviewOpened, setReviewDisplay } = useOutletContext<OutletContext>();

  return (
    <Modal
      contentRef={contentRef}
      isOpened={isReviewOpened}
      onClickOutside={() => setReviewDisplay(false)}
    >
      <p className="title title--h4">Оставить отзыв</p>
      <ReviewForm/>
      <button
        onClick={() => setReviewDisplay(false)}
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

export default ReviewModal;
