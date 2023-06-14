import { SubmitHandler, useForm } from 'react-hook-form';
import { FormEvent, Fragment, useEffect } from 'react';
import { NewReview } from '../../types/review';
import { useAppDispatch } from '../../hooks/store-hooks';
import clsx from 'clsx';
import { changePostStatus, postComment } from '../../store/comments-slice/comments-slice';
import Modal from '../modal/modal';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../types/app';
import { Status } from '../../consts/enums';

enum Field {
  Rate = 'rate',
  Name = 'user-name',
  Pros = 'user-plus',
  Cons = 'user-minus',
  Comment = 'user-comment',
}

const rateToRuName: Record<number, string> = {
  5: 'Отлично',
  4: 'Хорошо',
  3: 'Нормально',
  2: 'Плохо',
  1: 'Ужасно'
};

const CustomInput: { [key in Field]?: Record<'title' | 'error' | 'placeholder', string> } = {
  [Field.Name]: {
    title: 'Ваше имя',
    error: 'Нужно указать имя',
    placeholder: 'Введите ваше имя',
  },
  [Field.Pros]: {
    title: 'Достоинства',
    error: 'Нужно указать достоинства',
    placeholder: 'Основные преимущества товара',
  },
  [Field.Cons]: {
    title: 'Недостатки',
    error: 'Нужно указать недостатки',
    placeholder: 'Главные недостатки товара',
  }
};

type FormFields = {
  [Field.Rate]: string;
  [Field.Name]: string;
  [Field.Pros]: string;
  [Field.Cons]: string;
  [Field.Comment]: string;
}

type ReviewModalProps = {
  cameraId: number;
}

function ReviewModal({ cameraId }: ReviewModalProps) {
  const dispatch = useAppDispatch();
  const { isReviewOpened, setReviewDisplay } = useOutletContext<OutletContext>();
  const {
    watch,
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitSuccessful }
  } = useForm<FormFields>();

  watch();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  const createValidationClass = (field: Field) =>
    clsx({
      'is-invalid': errors[field],
      'is-valid': !errors[field] && isSubmitted
    });

  const submitHandler: SubmitHandler<FormFields> = async (data) => {
    const formData: NewReview = {
      review: data[Field.Comment],
      advantage: data[Field.Pros],
      disadvantage: data[Field.Cons],
      userName: data[Field.Name],
      rating: +data[Field.Rate],
      cameraId
    };

    await dispatch(postComment(formData));

    setReviewDisplay(false);
    setTimeout(() => dispatch(changePostStatus(Status.Success)));
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    handleSubmit(submitHandler)();
  };

  return (
    <Modal isOpened={isReviewOpened} onClickOutside={() => setReviewDisplay(false)}>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          onSubmit={onSubmit}
          method="post"
          noValidate
        >
          <div className="form-review__rate">
            <fieldset className={`rate form-review__item ${createValidationClass(Field.Rate)}`}>
              < legend className="rate__caption">
                Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div style={{ direction: 'rtl', flexDirection: 'row' }} className="rate__group">
                  {Array(5).fill('').map((_, index) => (
                    <Fragment key={`rating-${index.toString()}`}>
                      <input
                        {...register(Field.Rate, { required: true })}
                        className="visually-hidden"
                        id={`star-${index + 1}`}
                        type="radio"
                        value={index + 1}

                      />
                      <label
                        className="rate__label"
                        htmlFor={`star-${index + 1}`}
                        title={rateToRuName[index + 1]}
                      >
                      </label>
                    </Fragment>

                  )).reverse()}
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{getValues(Field.Rate) || 0}</span>
                  <span>/</span>
                  <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>

            {Object.keys(CustomInput).map((key) => {
              const field = key as Field;

              return (
                <div
                  key={field}
                  className={`custom-input form-review__item ${createValidationClass(field)}`}
                >
                  <label>
                    <span className="custom-input__label">
                      {CustomInput[field]?.title}
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input
                      {...register(field, { required: true })}
                      type="text"
                      placeholder={CustomInput[field]?.placeholder}
                    />
                  </label>
                  <p className="custom-input__error">{CustomInput[field]?.error}</p>
                </div>
              );
            })}

            <div className={`custom-textarea form-review__item ${createValidationClass(Field.Comment)}`}>
              <label>
                <span className="custom-textarea__label">
                      Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  style={{
                    border: !errors[Field.Comment] && isSubmitted ? '2px solid #65cd54' : ''
                  }}
                  {...register(Field.Comment, {
                    required: true,
                    minLength: 5
                  })}
                  placeholder="Поделитесь своим опытом покупки"
                >
                </textarea>
              </label>
              <div className="custom-textarea__error">Нужно добавить комментарий</div>
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
        </form>
      </div>
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
