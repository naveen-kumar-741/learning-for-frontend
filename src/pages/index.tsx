import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout/CommonLayout';
import PrivateRoutes from '../layouts/CommonLayout/PrivateRoutes';
import Home from './Home/Home';
import AppProvider from '../providers/AppProvider';
import ImagePreview from './ImagePreview/ImagePreview';
import MaintainingContextComponent from './MaintainingContextComponent/MaintainingContextComponent';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path="home-private"
              element={<CommonLayout component={Home} />}
            />
          </Route>
          <Route path="home" element={<CommonLayout component={Home} />} />
          <Route
            path="img-preview-demo"
            element={<CommonLayout component={ImagePreview} />}
          />
          <Route
            path="maintain-context"
            element={<CommonLayout component={MaintainingContextComponent} />}
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
