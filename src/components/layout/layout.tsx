import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { Camera } from '../../types/camera';
import { useState } from 'react';
import { OutletContext } from '../../types/app';

const Layout = () => {
  const [preview, setPreview] = useState<OutletContext['preview']>(null);

  const handlePreviewModalShow = (camera: Camera | null) => {
    document.body.style.overflow = preview ? '' : 'hidden';
    document.documentElement.style.paddingRight = 'calc(17px - (100vw - 100%)';

    setPreview(camera);
  };

  return (
    <div className='wrapper'>
      <Header/>
      <Outlet context={{ preview, handlePreviewModalShow }}/>
      <Footer/>
    </div>
  );
};

export default Layout;
