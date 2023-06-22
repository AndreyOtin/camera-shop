import { CSSProperties } from 'react';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utiils/formaters';
import { generatePath, Link, useOutletContext } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';
import { OutletContext } from '../../types/app';

type ProductCardProps = {
  camera: Camera;
  style?: CSSProperties;
  sortType?: string;
}

function ProductCard({ camera, style, sortType }: ProductCardProps) {
  const { setPreviewDisplay } = useOutletContext<OutletContext>();

  return (
    <div
      style={style}
      className="product-card"
    >
      <div className="product-card__img">
        <picture
          style={{
            userSelect: 'none'
          }}
        >
          <source
            type="image/webp"
            srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`}
          />
          <img
            src={camera.previewImg} srcSet={`${camera.previewImg2x} 2x`}
            width="280"
            height="240"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate" style={{ minHeight: '24px' }}>{
          Array(5).fill('').map((_, index) => (
            <svg key={`${index.toString()}`} width="17" height="16" aria-hidden="true">
              <use xlinkHref={`${index + 1 <= camera.rating ? '#icon-full-star' : '#icon-star'}`}></use>
            </svg>))
        }
        <p className="visually-hidden">Рейтинг: 3</p>
        <p className="rate__count">
          <span className="visually-hidden">Всего оценок:</span>
          {camera.reviewCount}
        </p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formatPrice(camera.price)}
          {' '}₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          onClick={() => setPreviewDisplay({ isModalOpened: true, camera })}
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link
          className="btn btn--transparent"
          to={generatePath(AppRoute.Product, { product: camera.id.toString() })}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
