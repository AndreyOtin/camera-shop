import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../consts/enums';
import CatalogScreen from '../../pages/catalog-screen';
import Layout from '../layout/layout';

const App = (): JSX.Element => (
  <Routes>
    <Route path={AppRoute.Root} element={<Layout/>}>
      <Route index element={<CatalogScreen/>}/>
      <Route path="*" element={<h2>not fond</h2>}/>
    </Route>
  </Routes>
);

export default App;
