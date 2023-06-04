import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';
import clsx from 'clsx';
import { MAX_CAMERAS_PER_PAGE } from '../../consts/app';

type PaginationProps = {
  camerasCount: number;
  bannerPosition: number;
  currentPage: number;
}

function Pagination({ camerasCount, bannerPosition, currentPage }: PaginationProps) {
  const pages = Math.ceil(camerasCount / MAX_CAMERAS_PER_PAGE);

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
              to={`${AppRoute.Catalog}?page=${currentPage - 1}`}
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
              to={`${AppRoute.Catalog}?page=${index + 1}`}
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
              to={`${AppRoute.Catalog}?page=${currentPage + 1}`}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
