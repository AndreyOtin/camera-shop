import { NavLink, useLocation } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';
import clsx from 'clsx';
import { menuNameToRuName } from '../../consts/app';

type BreadCrumbsProps = {
  productName?: string;
}

function Breadcrumbs({ productName }: BreadCrumbsProps) {
  const location = useLocation();

  let currentPath = '';
  const pathNames = location.pathname.split('/').filter(Boolean);
  const links = pathNames.map((name, index, elements) => {
    currentPath += `/${name}`;

    return (
      <li key={name} className="breadcrumbs__item">
        <NavLink
          className={({ isActive }) => clsx('breadcrumbs__link', isActive && 'breadcrumbs__link--active')}
          to={currentPath}
          end
        >
          <>
            {menuNameToRuName[name] || productName}
            {elements.length !== index + 1 &&
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>}
          </>
        </NavLink>
      </li>
    );
  });

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
          {links}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
