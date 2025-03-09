import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Home } from './pages/landing/page';
import SubscriptionPage from './pages/subscription/page';
import RegisterPage from './pages/register/page';
import LoginPage from './pages/login/page';
const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/subscription', element:<SubscriptionPage/>},
  { path: '/login', element: <LoginPage/>},
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <Navigate to="/" replace /> }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
