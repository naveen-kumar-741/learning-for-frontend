import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout/CommonLayout';
import PrivateRoutes from '../layouts/PrivateRoutes';
import Home from './Home/Home';
import AppProvider from '../providers/AppProvider';
import ImagePreview from './ImagePreview/ImagePreview';
import MaintainingContextComponent from './MaintainingContextComponent/MaintainingContextComponent';
import SignInPage from './SignInPage/SignInPage';
import SignUpPage from './SignUpPage/SignUpPage';
import AuthRoutes from '../layouts/AuthRoutes';
import ChatComponent from './ChatComponent/ChatComponent';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="chat" />} />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/doc-private"
              element={<CommonLayout component={Home} />}
            />
          </Route>
          <Route path="/doc" element={<CommonLayout component={Home} />} />
          <Route
            path="/chat/:roomId?"
            element={<CommonLayout component={ChatComponent} />}
          />
          <Route
            path="/img-preview-demo"
            element={<CommonLayout component={ImagePreview} />}
          />
          <Route
            path="/maintain-context"
            element={<CommonLayout component={MaintainingContextComponent} />}
          />
          <Route element={<AuthRoutes />}>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
