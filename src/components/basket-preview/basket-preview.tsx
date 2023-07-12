import { Camera } from '../../types/camera';
import { formatPrice } from '../../utiils/formaters';
import { categoryFilter } from '../../consts/filter';
import { typeNameToFormattedName } from '../../consts/format';
import clsx from 'clsx';
import React, { KeyboardEventHandler, ReactNode, useEffect, useRef, useState } from 'react';
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

function SingleItem({ children, ...rest }: { children: ReactNode; className: string }) {
  return (
    <div {...rest}>{children}</div>
  );
}

function ListItem({ children, ...rest }: { children: ReactNode; className: string }) {
  return (
    <li {...rest}> {children}</li>
  );
}

function BasketPreview({ preview, variant = BasketPreviewVariant.Primary }: BasketPreviewProps) {
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { setPreviewDisplay } = useOutletContext<OutletContext>();
  const [, setInit] = useState(false);
  const typeName = preview?.category === categoryFilter.video.ruName
    ? preview?.type
    : typeNameToFormattedName[preview?.type as keyof typeof typeNameToFormattedName];

  useEffect(() => {
    if (!ref.current || !preview?.count) {
      return;
    }

    ref.current.value = preview.count.toString();
  }, [preview?.count]);


  useEffect(() => {
    setInit(true);
  }, []);

  const checkCount = () => {
    if (!ref.current || !preview) {
      return;
    }

    let value = Math.floor(Number(ref.current.value));


    value = value > MAX_BASKET_PRODUCTS ? MAX_BASKET_PRODUCTS : value;
    value = value < MIN_BASKET_PRODUCTS ? MIN_BASKET_PRODUCTS : value;

    ref.current.value = value.toString();
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
    if (!ref.current || !preview) {
      return;
    }

    let number = Number(ref.current.value);

    if (number > MIN_BASKET_PRODUCTS) {
      dispatch(decreaseCount(preview));
    }

    number = number - 1 === 0 ? MIN_BASKET_PRODUCTS : --number;
    ref.current.value = number.toString();
  };

  const handleIncrease = () => {
    if (!ref.current || !preview) {
      return;
    }

    let number = Number(ref.current.value);

    if (number < MAX_BASKET_PRODUCTS) {
      dispatch(increaseCount(preview));
    }

    number = number >= MAX_BASKET_PRODUCTS ? MAX_BASKET_PRODUCTS : ++number;
    ref.current.value = number.toString();
  };

  const Item = variant === BasketPreviewVariant.Primary ? ListItem : SingleItem;

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
              disabled={ref.current ? +ref.current.value === MIN_BASKET_PRODUCTS : undefined}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <label className="visually-hidden" htmlFor="counter1"></label>
            <input
              ref={ref}
              type="number"
              id="counter1"
              min="1"
              max="99"
              aria-label="количество товара"
              onBlur={handleCountBlur}
              onKeyDown={handleInputKeyDown}
            />
            <button
              disabled={ref.current ? +ref.current.value === MAX_BASKET_PRODUCTS : undefined}
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
