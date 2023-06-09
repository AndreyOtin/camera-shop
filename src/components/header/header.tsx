import { AppRoute, Code, MainMenu, Status } from '../../consts/enums';
import { generatePath, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { menuNameToRuName } from '../../consts/app';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../hooks/store-hooks';
import {
  getCameras,
  getPromo,
  selectCameras,
  selectCamerasStatus,
  selectPromoStatus
} from '../../store/catalog-slice/catalog-slice';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { filterCamerasBySearch } from '../../utiils/filter';
import { Camera } from '../../types/camera';
import useArrowNavigation from '../../hooks/use-arrow-navigation';
import { selectBasketProductsCount } from '../../store/basket-slice/basket-slice';


function Header() {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector(selectCameras);
  const camerasStatus = useAppSelector(selectCamerasStatus);
  const promoStatus = useAppSelector(selectPromoStatus);
  const totalProductCount = useAppSelector(selectBasketProductsCount);

  const ref = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const filteredCameras = filterCamerasBySearch(cameras, search);
  const resetArrowNav = useArrowNavigation(searchRef, ref);

  const
    handleResetClick = useCallback(() => {
      setSearch('');
      resetArrowNav();
    }, [resetArrowNav]);

  useEffect(() => {
    handleResetClick();
  }, [handleResetClick, location.pathname]);

  useEffect(() => {
    if (camerasStatus === Status.Idle || promoStatus === Status.Idle) {
      dispatch(getCameras());
      dispatch(getPromo());
    }
  }, [camerasStatus, dispatch, promoStatus]);

  const handleNavigation = (camera: Camera) => {
    navigate(generatePath(AppRoute.Product, { product: camera.id.toString() }));
    setSearch('');
    resetArrowNav();
  };

  const onResultClick = (camera: Camera) => {
    handleNavigation(camera);
  };

  const onResultKeyDown = (evt: KeyboardEvent<HTMLLIElement>, camera: Camera) => {
    if (evt.code === Code.Enter) {
      handleNavigation(camera);
    }
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {Object.values(MainMenu).map((menu) => (
              menu === MainMenu.Basket ? null :
                <li key={menu} className="main-nav__item">
                  <NavLink
                    className={clsx('main-nav__link')}
                    to={`/${menu}`}
                  >
                    {menuNameToRuName[menu]}
                  </NavLink>
                </li>
            ))}
          </ul>
        </nav>
        <div
          className={clsx('form-search', filteredCameras.length && 'list-opened')}
          data-testid="form-search"
        >
          <form>
            <label>
              <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input
                ref={searchRef}
                onChange={(evt) => setSearch(evt.target.value)}
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                value={search}
              />
            </label>
            <ul ref={ref} className="form-search__select-list scroller">
              {filteredCameras.map((camera) => (
                <li
                  onKeyDown={(evt) => onResultKeyDown(evt, camera)}
                  onClick={() => onResultClick(camera)}
                  key={camera.id}
                  className="form-search__select-item"
                  tabIndex={0}
                >
                  {camera.name}
                </li>
              ))}
            </ul>
          </form>
          <button
            onClick={handleResetClick}
            className="form-search__reset"
            type="reset"
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>
        <Link className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {!!totalProductCount && <span className="header__basket-count">{totalProductCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
