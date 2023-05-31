import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import Layout from '../layout/layout';
import ErrorScreen from '../../pages/error-screen/error-screen';
import MainScreen from '../../pages/main-screen/main-screen';

const App = (): JSX.Element => (
  <Routes>
    <Route path={AppRoute.Root} element={<Layout/>}>
      <Route index element={<MainScreen/>}/>
      <Route path={AppRoute.Catalog} element={<CatalogScreen/>}/>
      <Route path="*" element={<ErrorScreen variant="404"/>}/>
    </Route>
  </Routes>
);

export default App;
