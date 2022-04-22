import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { UserPage } from '../pages/UserPage/UserPage';

export const AppRouting: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/user/:userId" element={<UserPage />} />
    </Routes>
  );
};
