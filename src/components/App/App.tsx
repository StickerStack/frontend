import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import {
  Header,
  MessagePopup,
  Popup,
  ChangePassword,
  MainPage,
  VerifyEmail,
  ProtectedRoute,
  PageNotFound,
  ProfilePage,
  AddStickers,
  Preloader,
} from '../';

import {
  PROFILE,
  PAGE_404,
  ADD_STICKERS,
  VERIFY_EMAIL,
  VERIFY_FORGOT_PASSWORD,
} from '../../utils/constants';
import { useAppDispatch } from '../../hooks/hooks';
import { getUser, signInMockUser } from '../../store/userSlice';
import styles from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(signInMockUser('my@super.user'));
      setIsLoading(false);
      return;
    }

    dispatch(getUser()).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className={styles.app}>
          <Header />
          <Routes>
            <Route path={VERIFY_EMAIL} element={<VerifyEmail />} />
            <Route
              path={VERIFY_FORGOT_PASSWORD}
              element={
                <ProtectedRoute redirectPath='/'>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path={ADD_STICKERS}
              element={
                <ProtectedRoute redirectPath='/'>
                  <AddStickers />
                </ProtectedRoute>
              }
            />
            <Route
              path={PROFILE}
              element={
                <ProtectedRoute redirectPath='/'>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<Navigate to={PAGE_404} />} />
            <Route path={PAGE_404} element={<PageNotFound />} />
            <Route path='/' element={<MainPage />} />
          </Routes>
          <MessagePopup />
          <Popup />
        </div>
      )}
    </>
  );
};

export { App };
