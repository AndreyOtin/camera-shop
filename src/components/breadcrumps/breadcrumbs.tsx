import { generatePath, NavLink, useLocation } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';
import clsx from 'clsx';

type BreadCrumbsProps = {
  productName?: string;
  productId?: number;
}

const pathToMenuName: Record<string, string> = {
  catalog: 'Kаталог'
};

function Breadcrumbs({ productName, productId }: BreadCrumbsProps) {
  const location = useLocation();
  const [pathRoot] = location.pathname.split('/').filter(Boolean);

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <NavLink
              className="breadcrumbs__link"
              to={AppRoute.Root}
              end
            >
              Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </NavLink>
          </li>
          <li className="breadcrumbs__item">
            <NavLink
              className={({ isActive }) => clsx('breadcrumbs__link', isActive && 'breadcrumbs__link--active')}
              to={AppRoute.Root}
              end={!!productName}
            >
              <>
                {pathToMenuName[pathRoot]}
                {productName &&
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>}
              </>
            </NavLink>
          </li>
          {productName && productId &&
            <li className="breadcrumbs__item">
              <NavLink
                className={({ isActive }) => clsx('breadcrumbs__link', isActive && 'breadcrumbs__link--active')}
                to={generatePath(AppRoute.Product, {id: productId.toString()})}
              >
                {productName}
              </NavLink>
            </li>}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
