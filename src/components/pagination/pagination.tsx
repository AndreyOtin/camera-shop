import { Link, useSearchParams } from 'react-router-dom';
import { AppRoute, MaxElementCount, SearchParam } from '../../consts/enums';
import clsx from 'clsx';

type PaginationProps = {
  camerasCount: number;
  bannerPosition: number;
  currentPage: number;
}

function Pagination({ camerasCount, bannerPosition, currentPage }: PaginationProps) {
  const pages = Math.ceil(camerasCount / MaxElementCount.ProductCard);
  const [params] = useSearchParams();

  const updateQueryString = () => {
    params.delete(SearchParam.Page);

    const queryString = params.toString();

    return queryString && `&${queryString}`;
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 &&
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
          </li>}

        {Array(pages).fill('').map((_, index) => (
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

        {currentPage !== pages &&
          <li className="pagination__item">
            <Link
              onClick={() => window.scroll({
                top: bannerPosition,
                behavior: 'smooth'
              })}
              className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}?page=${currentPage + 1}${updateQueryString()}`}

            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
