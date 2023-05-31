import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/enums';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import Layout from '../layout/layout';
import ErrorScreen from '../../pages/error-screen/error-screen';

const App = (): JSX.Element => (
  <Routes>
    <Route path={AppRoute.Root} element={<Layout/>}>
      <Route index element={<CatalogScreen/>}/>
      <Route path="*" element={<ErrorScreen variant="404"/>}/>
    </Route>
  </Routes>
);

export default App;
