import { Link, useSearchParams } from 'react-router-dom';
import { AppRoute, SearchParam, Status } from '../../consts/enums';
import clsx from 'clsx';
import { useAppSelector } from '../../hooks/store-hooks';
import { selectCamerasFullLoadStatus } from '../../store/catalog-slice/catalog-slice';
import Spinner from '../spinner/spinner';
import getPaginationVariables from '../../utiils/pagination';
import { Camera } from '../../types/camera';
import queryString from 'query-string';

type PaginationProps = {
  cameras: Camera[];
  bannerPosition: number;
}

function Pagination({ cameras, bannerPosition }: PaginationProps) {
  const [searchParams] = useSearchParams();
  const status = useAppSelector(selectCamerasFullLoadStatus);

  const {
    totalPages,
    currentPage
  } = getPaginationVariables(cameras.length, searchParams.get(SearchParam.Page) || undefined);

  const updateQueryString = () => {
    const query = queryString.parse(searchParams.toString());

    delete query[SearchParam.Page];

    const newQuery = queryString.stringify(query);

    return newQuery && `&${newQuery}`;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 &&
          (status.status === Status.Loading
            ?
            <Spinner variant="small" className="pagination__item" isActive/>
            :
            <li className="pagination__item">
              <Link
                onClick={() => window.scroll({
                  top: bannerPosition,
                  behavior: 'smooth'
                })}
                className="pagination__link pagination__link--text"
                to={`${AppRoute.Catalog}?page=${currentPage - 1}${updateQueryString()}`}
              >
                Назад
              </Link>
            </li>)}

        {totalPages > 1 && Array(totalPages).fill('').map((_, index) => (
          status.status === Status.Loading && index + 1 !== status.page
            ?
            <Spinner key={`${index.toString()}`} variant="small" className="pagination__item" isActive/>
            :
            <li
              key={`id-${index.toString()}`}
              className="pagination__item"
            >
              <Link
                onClick={() => window.scroll({
                  top: bannerPosition,
                  behavior: 'smooth'
                })}
                className={clsx('pagination__link', currentPage === index + 1 && 'pagination__link--active')}
                to={`${AppRoute.Catalog}?page=${index + 1}${updateQueryString()}`}
                replace={false}
              >
                {index + 1}
              </Link>
            </li>
        ))}

        {currentPage !== totalPages && (cameras.length || null) &&
          (status.status === Status.Loading
            ?
            <Spinner variant="small" className="pagination__item" isActive/>
            :
            <li className="pagination__item">
              <Link
                onClick={() => window.scroll({
                  top: bannerPosition,
                  behavior: 'smooth'
                })}
                className="pagination__link pagination__link--text"
                to={`${AppRoute.Catalog}?page=${currentPage + 1}${updateQueryString()}`}
                replace={false}
              >
                Далее
              </Link>
            </li>)}
      </ul>
    </div>
  );
}

export default Pagination;
