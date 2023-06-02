import { useAppSelector } from '../../hooks/store-hooks';
import { selectComments } from '../../store/comments-slice/comments-slice';
import ReviewCard from './review-card/review-card';
import dayjs from 'dayjs';
import { useState } from 'react';

const MAX_COMMENTS = 3;

function Reviews() {
  const comments = useAppSelector(selectComments);
  const [currentCommentsCount, setCommentsCount] = useState(MAX_COMMENTS);
  const sortedComments = [...comments].sort((a, b) => dayjs(b.createAt).diff(a.createAt));

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {sortedComments
            .slice(0, currentCommentsCount)
            .map((comment) => (<ReviewCard key={comment.id} review={comment}/>))}
        </ul>
        <div className="review-block__buttons">
          {sortedComments.length > currentCommentsCount &&
            <button
              onClick={() => setCommentsCount((count) => count + MAX_COMMENTS)}
              className="btn btn--purple"
              type="button"
            >
              Показать больше отзывов
            </button>}
        </div>
      </div>
    </section>
  );
}

export default Reviews;
