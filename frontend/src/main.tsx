import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
//pages
import { Home } from './pages/landing/page';
import { SubscriptionPage } from './pages/subscription/page';
import { RegisterPage } from './pages/register/page';
import { LoginPage } from './pages/login/page';
import { InterviewerDashboard } from './pages/dashboard/interviewer/page';
import { StudentDashboard } from './pages/dashboard/student/page';
import { InterviewPage } from './pages/interview/page';
import { PersonalTrainerPage } from './pages/dashboard/student/personal-trainer/page';
import { PersonalTrainerDashboard } from './pages/dashboard/student/personal-trainer/dashboard';
import { CompanyInterviewsPage } from './pages/dashboard/student/company-interviews/page';
import { FeedbackReportPage } from './pages/dashboard/student/feedback/page';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/subscription', element: <SubscriptionPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  { path: '/interviewer/dashboard', element: <InterviewerDashboard /> },

  { path: '/student/dashboard', element: <StudentDashboard /> },
  { path: '/student/personal-trainer', element: <PersonalTrainerPage /> },
  { path: '/student/personal-trainer/dashboard', element: <PersonalTrainerDashboard /> },
  { path: '/student/company-interviews', element: <CompanyInterviewsPage /> },
  { path: '/student/feedback/:interviewId', element: <FeedbackReportPage /> },
  { path: '/interview/:id', element: <InterviewPage /> },
  { path: '*', element: <Navigate to="/" replace /> }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
