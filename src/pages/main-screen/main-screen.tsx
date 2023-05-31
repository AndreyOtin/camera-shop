import { generatePath, Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';

function MainScreen() {
  return (
    <Navigate to={generatePath(AppRoute.Catalog, { page: 'page_1' })}/>
  );
}

export default MainScreen;
