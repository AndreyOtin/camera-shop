import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';

function MainScreen() {
  return (
    <Navigate to={AppRoute.Catalog}/>
  );
}

export default MainScreen;
