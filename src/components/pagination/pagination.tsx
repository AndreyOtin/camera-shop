import { generatePath, Link, NavLink } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';
import clsx from 'clsx';
import useCurrentPage from '../../hooks/use-current-page';
import { MAX_CAMERAS_PER_PAGE } from '../../consts/app';

type PaginationProps = {
  camerasCount: number;
}

function Pagination({ camerasCount }: PaginationProps) {
  const pages = Math.ceil(camerasCount / MAX_CAMERAS_PER_PAGE);
  const currentPage = useCurrentPage();

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage !== 1 &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.Catalog, { page: `page_${currentPage - 1}` })}
            >
              Назад
            </Link>
          </li>}

        {Array(pages).fill('').map((_, index) => (
          <li
            key={`id-${index.toString()}`}
            className="pagination__item"
          >
            <NavLink
              className={({ isActive }) => clsx('pagination__link', isActive && 'pagination__link--active')}
              to={generatePath(AppRoute.Catalog, { page: `page_${index + 1}` })}
            >
              {index + 1}
            </NavLink>
          </li>
        ))}

        {currentPage !== pages &&
          <li className="pagination__item">
            <Link
              className="pagination__link pagination__link--text"
              to={generatePath(AppRoute.Catalog, { page: `page_${currentPage + 1}` })}
            >
              Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
}

export default Pagination;
