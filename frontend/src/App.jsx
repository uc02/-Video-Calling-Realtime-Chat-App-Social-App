import { Navigate, Route, Routes } from "react-router";
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Notification from './pages/NotificationsPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';

import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";

export default function App() {

  const { isLoading, authUser } = useAuthUser();

  const isAutheticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded

  if (isLoading) return <PageLoader />

  return (
    <div className="h-screen " data-theme="night">

      <Routes>
        <Route path="/" element={isAutheticated && isOnboarded ? (
          <HomePage />
        ) : (
          <Navigate to={!isAutheticated ? "/login" : "/onboarding"} />
        )} />
        <Route path="/signup" element={!isAutheticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/ onboarding"
          } />} />
        <Route 
          path="/login"
          element={!isAutheticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"
          } />} />
        <Route path="/notification" element={isAutheticated ? <Notification /> : <Navigate to="/login" />} />
        <Route path="/call" element={isAutheticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAutheticated ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={isAutheticated ? (
          !isOnboarded ? (<OnboardingPage />) : (<Navigate to="/" />)
        ) : (
          <Navigate to="/login" />
        )} />
      </Routes>

      <Toaster />
    </div>
  )
}