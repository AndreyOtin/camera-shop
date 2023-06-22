import ProductCard from '../product-card/product-card';
import { SortType, Status } from '../../consts/enums';
import { Camera } from '../../types/camera';
import Spinner from '../spinner/spinner';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectCamerasFullLoadStatus } from '../../store/catalog-slice/catalog-slice';
import CatalogSort from '../catalog-sort/catalog-sort';
import Pagination from '../pagination/pagination';

type CatalogProps = {
  cameras: Camera[];
  filteredCameras: Camera[];
  bannerPosition: number;
  sortType?: string;
}

function Catalog({ cameras, bannerPosition, sortType, filteredCameras }: CatalogProps) {
  const status = useAppSelector(selectCamerasFullLoadStatus);

  return (
    <div className="catalog__content">
      <CatalogSort/>
      <div
        style={status.status === Status.Loading && sortType === SortType.Popular ? {
          opacity: 0.4,
          pointerEvents: 'none',
          position: 'relative'
        } : {}}
        className="cards catalog__cards"
      >
        {status.status === Status.Loading && sortType === SortType.Popular &&
          <Spinner
            style={{
              position: 'absolute',
              zIndex: '100'
            }}
            isActive
          />}
        {cameras
          .map((camera) => (
            <ProductCard
              key={camera.id}
              camera={camera}
            />))}
      </div>
      {!filteredCameras.length && <p style={{ textAlign: 'center' }}><b>«Hо вашему запросу ничего не найдено»</b></p>}
      <Pagination
        bannerPosition={bannerPosition}
        cameras={filteredCameras}
      />
    </div>
  );
}

export default Catalog;
