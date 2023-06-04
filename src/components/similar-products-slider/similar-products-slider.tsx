import { Camera } from '../../types/camera';
import ProductCard from '../product-card/product-card';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRef, useState } from 'react';
import clsx from 'clsx';

type SimilarProductsSliderProps = {
  products: Camera[];
}

function SimilarProductsSlider({ products }: SimilarProductsSliderProps) {
  const swiperRef = useRef<SwiperRef['swiper']>();
  const [{ isBeginning, isEnd }, setSliderState] = useState({
    isEnd: false,
    isBeginning: true
  });

  return (
    <div className="product-similar__slider">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setSliderState({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
        }}
        className="product-similar__slider-list"
        slidesPerView={3}
        spaceBetween={30}
        allowTouchMove={false}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              style={{
                display: 'block',
                width: '100%'
              }}
              camera={product}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        style={{
          pointerEvents: isBeginning ? 'none' : 'auto'
        }}
        onClick={() => swiperRef.current?.slidePrev()}
        className={clsx('slider-controls slider-controls--prev', isBeginning && 'disabled')}
        type="button"
        aria-label="Предыдущий слайд"
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button
        style={{
          pointerEvents: isEnd ? 'none' : 'auto'
        }}
        onClick={() => swiperRef.current?.slideNext()}
        className={clsx('slider-controls slider-controls--next', isEnd && 'disabled')}
        type="button"
        aria-label="Следующий слайд"
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}

export default SimilarProductsSlider;
