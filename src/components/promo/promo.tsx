import { Promo as PromoType } from '../../types/camera';
import { useEffect, useRef } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';

type PromoProps = {
  promo: PromoType;
  description: string | undefined;
  setBannerPosition: (pos:number)=>void;
}

function Promo({ promo, description, setBannerPosition }: PromoProps) {
  const promoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (promoRef.current) {
      const { bottom } = promoRef.current.getBoundingClientRect();

      setBannerPosition(bottom);
    }
  }, [setBannerPosition]);


  return (
    <div ref={promoRef} className="banner">
      <picture>
        <source
          type="image/webp"
          srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`}
        />
        <img
          src={promo.previewImg}
          srcSet={`${promo.previewImg2x} 2x`}
          width="1280"
          height="280"
          alt={promo.name}
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {promo.name}
        </span>
        <span
          className="banner__text"
        >
          {description}
        </span>
        <Link className="btn" to={generatePath(AppRoute.Product, {product: promo.id.toString()})}>
          Подробнее
        </Link>
      </p>
    </div>
  );
}

export default Promo;
