import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import {
  changePromoStatus,
  checkCoupon,
  selectBasketProductsTotal,
  selectCoupon,
  selectCouponStatus,
  selectTotalWithCoupon
} from '../../store/basket-slice/basket-slice';
import { formatPrice } from '../../utiils/formaters';
import clsx from 'clsx';
import { Status } from '../../consts/enums';

function BasketSummary() {
  const total = useAppSelector(selectBasketProductsTotal);
  const totalWithCoupon = useAppSelector(selectTotalWithCoupon);
  const couponStatus = useAppSelector(selectCouponStatus);
  const coupon = useAppSelector(selectCoupon);
  const dispatch = useAppDispatch();
  const [userPromo, setUserPromo] = useState('');

  useEffect(() => () => {
    dispatch(changePromoStatus());
  }, [dispatch]);

  const handleApplyCouponClick = () => {
    dispatch(checkCoupon(userPromo));
  };

  const handleCouponInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    if (couponStatus === Status.Error || couponStatus === Status.Success) {
      dispatch(changePromoStatus());
    }

    setUserPromo(evt.target.value.trim());
  };

  return (
    <div className="basket__summary">
      <div className="basket__promo">
        <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
        <div className="basket-form">
          <form action="#">
            <div
              className={clsx('custom-input', {
                'is-valid': couponStatus === Status.Success,
                'is-invalid': couponStatus === Status.Error
              })}
            >
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  onChange={handleCouponInputChange}
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="button"
              onClick={handleApplyCouponClick}
            >
              Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span>
          <span
            className="basket__summary-value"
          >
            {formatPrice(total)} ₽
          </span>
        </p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span>
          <span
            className="basket__summary-value basket__summary-value--bonus"
          >
            {formatPrice(coupon)} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
          К оплате:
          </span>
          <span
            className="basket__summary-value basket__summary-value--total"
          >
            {coupon ? formatPrice(totalWithCoupon) : formatPrice(total)} ₽
          </span>
        </p>
        <button className="btn btn--purple" type="submit">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default BasketSummary;
