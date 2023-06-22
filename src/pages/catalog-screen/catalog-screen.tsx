import { Helmet } from 'react-helmet-async';
import Breadcrumbs from '../../components/breadcrumps/breadcrumbs';
import Promo from '../../components/promo/promo';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import { useEffect, useRef, useState } from 'react';
import { Status } from '../../consts/enums';
import Spinner from '../../components/spinner/spinner';
import ErrorScreen from '../error-screen/error-screen';
import PreviewModal from '../../components/preview-modal/preview-modal';
import {
  getCameras,
  getPromo,
  selectCameras,
  selectCamerasStatus,
  selectPromo,
  selectPromoStatus
} from '../../store/catalog-slice/catalog-slice';
import { checkStatus } from '../../utiils/common';
import CatalogContent from '../../components/catalog-content/catalog-content';

function CatalogScreen() {
  const dispatch = useAppDispatch();
  const camerasStatus = useAppSelector(selectCamerasStatus);
  const promoStatus = useAppSelector(selectPromoStatus);
  const cameras = useAppSelector(selectCameras);
  const promo = useAppSelector(selectPromo);

  const { isLoading, isError } = checkStatus({ status: { camerasStatus, promoStatus } });
  const [bannerPosition, setBannerPosition] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (camerasStatus === Status.Idle || promoStatus === Status.Idle) {
      dispatch(getCameras());
      dispatch(getPromo());
    }
  }, [camerasStatus, dispatch, promoStatus]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  if (isLoading) {
    return <Spinner isActive/>;
  }

  if (isError || !promo) {
    return <ErrorScreen variant="error"/>;
  }

  const promoDescription = cameras.find((item) => item?.id === promo.id)?.description;

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
        <section ref={ref} className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <CatalogContent cameras={cameras} bannerPosition={bannerPosition}/>
          </div>
        </section>
      </div>
      <PreviewModal contentRef={ref}/>
    </main>
  );
}

export default CatalogScreen;
