import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';

const Layout = () => (
  <div className='wrapper'>
    <Header/>
    <Outlet/>
    <Footer/>
  </div>
);

export default Layout;