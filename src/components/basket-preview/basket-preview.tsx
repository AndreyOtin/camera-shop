import { Camera } from '../../types/camera';
import { formatPrice } from '../../utiils/formaters';
import { categoryFilter } from '../../consts/filter';
import { typeNameToFormattedName } from '../../consts/format';
import clsx from 'clsx';
import React, { KeyboardEventHandler, useState } from 'react';
import { BasketPreviewVariant, Code } from '../../consts/enums';
import { useAppDispatch } from '../../hooks/store-hooks';
import { changeCount, decreaseCount, increaseCount } from '../../store/basket-slice/basket-slice';
import { MAX_BASKET_PRODUCTS, MIN_BASKET_PRODUCTS } from '../../consts/app';
import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../../types/app';

type BasketPreviewProps = {
  preview: Camera | undefined;
  variant?: BasketPreviewVariant;
}

function BasketPreview({ preview, variant = BasketPreviewVariant.Primary }: BasketPreviewProps) {
  const dispatch = useAppDispatch();
  const { setPreviewDisplay } = useOutletContext<OutletContext>();
  const typeName = preview?.category === categoryFilter.video.ruName
    ? preview?.type
    : typeNameToFormattedName[preview?.type as keyof typeof typeNameToFormattedName];
  const [count, setCount] = useState(preview?.count?.toString());

  const checkCount = () => {
    if (!preview) {
      return;
    }

    let value = Math.floor(Number(count));

    value = value > MAX_BASKET_PRODUCTS ? MAX_BASKET_PRODUCTS : value;
    value = value < MIN_BASKET_PRODUCTS ? MIN_BASKET_PRODUCTS : value;

    setCount(value.toString());
    dispatch(changeCount({ count: value, id: preview.id }));
  };

  const handleCountBlur = () => {
    checkCount();
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (evt) => {
    if (evt.code === Code.Enter) {
      checkCount();
    }
  };

  const handleDecrease = () => {
    if (!preview) {
      return;
    }
    let number = Number(count);

    if (number > MIN_BASKET_PRODUCTS) {
      dispatch(decreaseCount(preview));
    }

    number = number - 1 === 0 ? MIN_BASKET_PRODUCTS : --number;
    setCount(number.toString());
  };

  const handleIncrease = () => {
    if (!preview) {
      return;
    }

    let number = Number(count);

    if (number < MAX_BASKET_PRODUCTS) {
      dispatch(increaseCount(preview));
    }

    number = number >= MAX_BASKET_PRODUCTS ? MAX_BASKET_PRODUCTS : ++number;
    setCount(number.toString());
  };

  const Item = variant === BasketPreviewVariant.Primary ? 'li' : 'div';

  return (
    <Item className={clsx('basket-item', {
      'basket-item--short':
        variant === BasketPreviewVariant.Short ||
        variant === BasketPreviewVariant.BasketModal,
    })}
    >
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${preview?.previewImgWebp || ''}, ${preview?.previewImgWebp2x || ''} 2x`}
          />
          <img
            src={preview?.previewImg || ''}
            srcSet={`${preview?.previewImg2x || ''} 2x`}
            width="140"
            height="120"
            alt={preview?.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{preview?.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул: </span>
            <span className="basket-item__number">
              {preview?.vendorCode}
            </span>
          </li>
          <li
            className="basket-item__list-item"
          >
            {typeName}
            {' '}
            {preview?.category.toLocaleLowerCase()}
          </li>
          <li className="basket-item__list-item">{preview?.level} уровень</li>
        </ul>
        {variant === BasketPreviewVariant.Short &&
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(preview?.price || 0)} ₽
          </p>}
      </div>
      {variant === BasketPreviewVariant.Primary &&
        <>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(preview?.price || 0)} ₽
          </p>
          <div className="quantity">
            <button
              onClick={handleDecrease}
              className="btn-icon btn-icon--prev"
              aria-label="уменьшить количество товара"
              disabled={count ? +count === MIN_BASKET_PRODUCTS : undefined}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <label className="visually-hidden" htmlFor="counter1"></label>
            <input
              value={count}
              onChange={(evt) => setCount(evt.target.value)}
              type="number"
              id="counter1"
              min="1"
              max="99"
              aria-label="количество товара"
              onBlur={handleCountBlur}
              onKeyDown={handleInputKeyDown}
            />
            <button
              disabled={count ? +count === MAX_BASKET_PRODUCTS : undefined}
              onClick={handleIncrease}
              className="btn-icon btn-icon--next"
              aria-label="увеличить количество товара"
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket-item__total-price">
            <span className="visually-hidden">Общая цена:</span>{formatPrice(preview?.totalPrice || 0)} ₽
          </div>
          <button
            onClick={() => setPreviewDisplay({ isModalOpened: true, camera: preview })}
            className="cross-btn"
            type="button"
            aria-label="Удалить товар"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </>}
    </Item>
  );
}

export default BasketPreview;
