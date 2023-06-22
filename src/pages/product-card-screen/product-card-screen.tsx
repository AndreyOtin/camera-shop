import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import Spinner from '../../components/spinner/spinner';
import ErrorScreen from '../error-screen/error-screen';
import { MouseEvent, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumps/breadcrumbs';
import { formatPrice } from '../../utiils/formaters';
import ProductTabs from '../../components/product-tabs/product-tabs';
import ScrollToTop from '../../components/scroll-to-top/scroll-to-top';
import { fetchComments, selectCommentsStatus } from '../../store/comments-slice/comments-slice';
import Reviews from '../../components/reviews/reviews';
import SimilarProductsSlider from '../../components/similar-products-slider/similar-products-slider';
import PreviewModal from '../../components/preview-modal/preview-modal';
import {
  fetchProduct,
  fetchSimilarProducts,
  selectProduct,
  selectProductStatus,
  selectSimilarProducts,
  selectSimilarProductStatus
} from '../../store/product-slice/product-slice';
import ReviewModal from '../../components/review-modal/review-modal';
import ReviewSuccessModal from '../../components/review-success-modal/review-success-modal';
import { checkStatus } from '../../utiils/common';
import Stars from '../../components/stars/stars';
import { selectCameras } from '../../store/catalog-slice/catalog-slice';

function ProductCardScreen() {
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const cameras = useAppSelector(selectCameras);
  const similarProducts = useAppSelector(selectSimilarProducts);
  const { status: productStatus, code: productStatusCode } = useAppSelector(selectProductStatus);
  const { status: commentsStatus, code: commentsStatusCode } = useAppSelector(selectCommentsStatus);
  const { status: similarProductStatus, code: similarProductStatusCode } = useAppSelector(selectSimilarProductStatus);


  const id = useParams().product;
  const ref = useRef<HTMLDivElement>(null);
  const { isLoading, isNotFound, isError } = checkStatus({
    status: { productStatus, commentsStatus, similarProductStatus },
    code: { productStatusCode, commentsStatusCode, similarProductStatusCode }
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchProduct(id));
    dispatch(fetchComments(id));
    dispatch(fetchSimilarProducts(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <Spinner isActive/>;
  }

  if (isNotFound) {
    return <ErrorScreen variant="404"/>;
  }

  if (isError || !product) {
    return <ErrorScreen variant="error"/>;
  }

  const handleUpButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    ref.current?.focus();

    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  const camera = cameras.find((item) => item.id === product.id);
  const rating = camera?.rating || product.rating;
  const previewCount = camera?.reviewCount || product.reviewCount;

  return (
    <>
      <main>
        <ScrollToTop/>
        <div ref={ref} className="page-content" tabIndex={-1} style={{ outline: 'none' }}>
          <Breadcrumbs productName={product.name}/>
          <div className="page-content__section">
            <section className="product" data-testid="product-card-screen">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}
                    />
                    <img
                      src={`${product.previewImg}`}
                      srcSet={`${product.previewImg2x} 2x`}
                      width="560"
                      height="480"
                      alt={product.name}
                    />
                  </picture>
                </div>
                <div className="product__content">
                  <h1 className="title title--h3">{product.name}</h1>
                  <div className="rate product__rate">
                    <Stars rating={rating}/>
                    <p className="visually-hidden">Рейтинг: {rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>
                      {previewCount}
                    </p>
                  </div>
                  <p className="product__price">
                    <span className="visually-hidden">Цена:</span>
                    {formatPrice((product.price))} ₽
                  </p>
                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>
                    Добавить в корзину
                  </button>
                  <ProductTabs/>
                </div>
              </div>
            </section>
          </div>
          {similarProducts.length &&
            <div className="page-content__section">
              <section className="product-similar">
                <div className="container">
                  <h2 className="title title--h3">Похожие товары</h2>
                  <SimilarProductsSlider products={similarProducts}/>
                </div>
              </section>
            </div>}
          <div className="page-content__section">
            <Reviews/>
          </div>
        </div>
        <ReviewModal contentRef={ref}/>
        <PreviewModal contentRef={ref}/>
        <ReviewSuccessModal contentRef={ref}/>
      </main>
      <a
        onClick={(evt) => handleUpButtonClick(evt)}
        className="up-btn"
        href="#header"
      >
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </>
  );
}

export default ProductCardScreen;
