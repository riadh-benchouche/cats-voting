import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

// Pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import HomePage from '@/pages/HomePage';
import VotePage from '@/pages/VotePage';
import RankingPage from '@/pages/RankingPage';
import ProfilePage from '@/pages/ProfilePage';

// Layout
import Layout from '@/components/layout/Layout';

// ProtectedRoute component to guard routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Router configuration
const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'vote',
                element: <VotePage />,
            },
            {
                path: 'ranking',
                element: <RankingPage />,
            },
            {
                path: 'profile',
                element: <ProfilePage />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};