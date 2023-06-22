import { CSSProperties } from 'react';
import { Camera } from '../../types/camera';
import { formatPrice } from '../../utiils/formaters';
import { generatePath, Link, useOutletContext } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';
import { OutletContext } from '../../types/app';
import Stars from '../stars/stars';

type ProductCardProps = {
  camera: Camera;
  style?: CSSProperties;
}

function ProductCard({ camera, style }: ProductCardProps) {
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
        <div className="rate product-card__rate">
          <Stars rating={camera.rating}/>
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
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
