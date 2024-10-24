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
          <Route
            path="/"
            element={<Navigate to="/learning-for-frontend/doc" />}
          />
          <Route element={<PrivateRoutes />}>
            <Route
              path="/learning-for-frontend/doc-private"
              element={<CommonLayout component={Home} />}
            />
            <Route
              path="/learning-for-frontend/chat/:roomId?"
              element={<CommonLayout component={ChatComponent} />}
            />
          </Route>
          <Route
            path="/learning-for-frontend/doc"
            element={<CommonLayout component={Home} />}
          />
          <Route
            path="/learning-for-frontend/img-preview-demo"
            element={<CommonLayout component={ImagePreview} />}
          />
          <Route
            path="/learning-for-frontend/maintain-context"
            element={<CommonLayout component={MaintainingContextComponent} />}
          />
          <Route element={<AuthRoutes />}>
            <Route
              path="/learning-for-frontend/sign-in"
              element={<SignInPage />}
            />
            <Route
              path="/learning-for-frontend/sign-up"
              element={<SignUpPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
