import Modal from '../../modal/modal';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../../types/app';
import ReviewForm from '../../review-form/review-form';
import { RefObject } from 'react';

function ReviewModal({ contentRef }: { contentRef: RefObject<HTMLDivElement> }) {
  const { isReviewOpened, setReviewDisplay } = useOutletContext<OutletContext>();

  return (
    <Modal
      contentRef={contentRef}
      isOpened={isReviewOpened}
      onClose={() => setReviewDisplay(false)}
    >
      <p className="title title--h4">Оставить отзыв</p>
      <ReviewForm/>
    </Modal>
  );
}

export default ReviewModal;
