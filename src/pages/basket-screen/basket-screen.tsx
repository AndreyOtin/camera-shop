import React, { useRef } from 'react';
import Breadcrumbs from '../../components/breadcrumps/breadcrumbs';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectAllBasketProducts } from '../../store/basket-slice/basket-slice';
import BasketPreview from '../../components/basket-preview/basket-preview';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import BasketRemoveModal from '../../components/modals/basket-remove-modal/basket-remove-modal';
import BasketSummary from '../../components/basket-summary/basket-summary';
import BuySuccessModal from '../../components/modals/buy-success-modal/buy-success-modal';
import BuyErrorModal from '../../components/modals/buy-error-modal/buy-error-modal';

function BasketScreen() {
  const products = useAppSelector(selectAllBasketProducts);
  const ref = useRef(null);

  return (
    <main>
      <ScrollToTop/>
      <div className="page-content">
        <Breadcrumbs/>
        <section className="basket" ref={ref}>
          <div className="container">
            <h1 className="title title--h2">Корзина</h1>
            <ul className="basket__list">
              {products.map((item) => (
                <BasketPreview key={item.id} preview={item}/>))}
              {!products.length && <li style={{ fontSize: '25px' }}>Пусто</li>}
            </ul>
            <BasketSummary/>
          </div>
        </section>
      </div>
      <BasketRemoveModal contentRef={ref}/>
      <BuySuccessModal contentRef={ref}/>
      <BuyErrorModal contentRef={ref}/>
    </main>
  );
}

export default BasketScreen;
