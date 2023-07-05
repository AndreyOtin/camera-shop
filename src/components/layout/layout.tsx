import { Outlet } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useState } from 'react';
import { PreviewModal } from '../../types/app';

const Layout = () => {
  const [preview, setPreviewDisplay] = useState<PreviewModal>({ isModalOpened: false });
  const [isReviewOpened, setReviewDisplay] = useState(false);
  const [isAddItemSuccessOpened, setAddItemSuccessDisplay] = useState(false);

  const context = {
    preview,
    setPreviewDisplay,
    isReviewOpened,
    setReviewDisplay,
    isAddItemSuccessOpened,
    setAddItemSuccessDisplay
  };

  return (
    <div className="wrapper">
      <Header/>
      <Outlet context={context}/>
      <Footer/>
    </div>
  );
};

export default Layout;
