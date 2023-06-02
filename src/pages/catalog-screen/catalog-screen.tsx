import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/breadcrumps/breadcrumbs';
import Promo from '../../components/promo/promo';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { useEffect, useState } from 'react';
import { Status } from '../../consts/enums';
import Spinner from '../../components/spinner/spinner';
import ErrorScreen from '../error-screen/error-screen';
import useCurrentPage from '../../hooks/use-current-page';
import { MAX_CAMERAS_PER_PAGE } from '../../consts/app';
import PreviewModal from '../../components/preview-modal/preview-modal';
import { Camera } from '../../types/camera';
import {
  getCameras,
  getPromo,
  selectCameras,
  selectCamerasStatus,
  selectPromo,
  selectPromoStatus
} from '../../store/catalog-slice/catalog-slice';

function CatalogScreen() {
  const dispatch = useAppDispatch();
  const camerasStatus = useAppSelector(selectCamerasStatus);
  const promoStatus = useAppSelector(selectPromoStatus);
  const cameras = useAppSelector(selectCameras);
  const promo = useAppSelector(selectPromo);
  const currentPage = useCurrentPage();

  const [preview, setPreview] = useState<Camera | null>(null);
  const [bannerPosition, setBannerPosition] = useState(0);

  const handlePreviewModalShow = (camera: Camera | null) => {
    document.body.style.overflow = preview ? '' : 'hidden';

    setPreview(camera);
  };

  useEffect(() => {
    if (camerasStatus === Status.Idle) {
      dispatch(getCameras());
      dispatch(getPromo());
    }
  }, [camerasStatus, dispatch]);

  const isSpinnerActive =
    camerasStatus === Status.Idle ||
    camerasStatus === Status.Loading ||
    promoStatus === Status.Idle ||
    promoStatus === Status.Loading;

  if (isSpinnerActive) {
    return <Spinner isActive/>;
  }

  if (camerasStatus === Status.Error || promoStatus === Status.Error || !promo) {
    return <ErrorScreen variant="error"/>;
  }

  if (!currentPage || currentPage > Math.ceil(cameras.length / MAX_CAMERAS_PER_PAGE)) {
    return <ErrorScreen variant="404"/>;
  }

  const promoDescription = cameras.find((item) => item.id === promo.id)?.description;
  const sliceStart = (currentPage - 1) * MAX_CAMERAS_PER_PAGE;
  const sliceEnd = sliceStart + MAX_CAMERAS_PER_PAGE;
  const slicedCameras = cameras.slice(sliceStart, sliceEnd);

  return (
    <main>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <Promo
        setBannerPosition={setBannerPosition}
        promo={promo}
        description={promoDescription}
      />
      <div className="page-content">
        <Breadcrumbs/>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogFilter/>
              <div className="catalog__content">
                <CatalogSort/>
                <div className="cards catalog__cards">
                  {slicedCameras
                    .map((camera) =>
                      (
                        <ProductCard
                          key={camera.id}
                          camera={camera}
                          onReviewButtonClick={handlePreviewModalShow}
                        />))}
                </div>
                <Pagination bannerPosition={bannerPosition} camerasCount={cameras.length}/>
              </div>
            </div>
          </div>
        </section>
      </div>
      <PreviewModal
        preview={preview}
        onCloseButtonClick={handlePreviewModalShow}
      />
    </main>
  );
}

export default CatalogScreen;
