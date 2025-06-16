import {createBrowserRouter, RouterProvider, Navigate, useNavigate} from 'react-router-dom';
import {useAuth} from '@/hooks/useAuth';

// ===== PAGES =====
// Public Pages
import HomePage from '@/pages/HomePage';
import RankingPage from '@/pages/RankingPage';

// Authentication Pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';

// Protected Pages
import VotePage from '@/pages/VotePage';
import ProfilePage from '@/pages/ProfilePage';

// Error Pages
import NotFoundPage from '@/pages/errors/NotFoundPage';
import ForbiddenPage from '@/pages/errors/ForbiddenPage';
import ServerErrorPage from '@/pages/errors/ServerErrorPage';

// Layouts
import Layout from '@/components/layout/Layout';

// ======= GUARDS DE ROUTES =======
/**
 * ProtectedRoute - For routes that require authentication
 * Redirects to /login if not authenticated
 */
const ProtectedRoute = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace/>;
};

/**
 * AuthRoute - For routes that should only be accessible to unauthenticated users
 * Redirects to / if already authenticated
 */
const AuthRoute = ({children}: { children: React.ReactNode }) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <Navigate to="/" replace/> : <>{children}</>;
};

/**
 * PublicRoute - For routes that are accessible to everyone
 */
const PublicRoute = ({children}: { children: React.ReactNode }) => {
    return <>{children}</>;
};

// ======= CONFIGURATION DU ROUTER =======

const router = createBrowserRouter([
    // ===== ROUTES D'AUTHENTIFICATION =====
    // Accessible uniquement aux utilisateurs NON connectés
    {
        path: '/login',
        element: (
            <AuthRoute>
                <LoginPage/>
            </AuthRoute>
        ),
    },
    {
        path: '/register',
        element: (
            <AuthRoute>
                <RegisterPage/>
            </AuthRoute>
        ),
    },

    // ===== ROUTES PUBLIQUES =====
    // Accessibles à tous (connectés ou non)
    {
        path: '/',
        element: (
            <PublicRoute>
                <Layout/>
            </PublicRoute>
        ),
        children: [
            {
                index: true,
                element: <HomePage/>,
            },
            {
                path: 'ranking',
                element: <RankingPage/>,
            },
        ],
    },

    // ===== ROUTES PROTÉGÉES =====
    // Accessible uniquement aux utilisateurs connectés
    {
        path: '/app',
        element: (
            <ProtectedRoute>
                <Layout/>
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'vote',
                element: <VotePage/>,
            },
            {
                path: 'profile',
                element: <ProfilePage/>,
            },
        ],
    },

    // ===== PAGES D'ERREUR =====
    {
        path: '/403',
        element: (
            <PublicRoute>
                <ForbiddenPage/>
            </PublicRoute>
        ),
    },
    {
        path: '/500',
        element: (
            <PublicRoute>
                <ServerErrorPage/>
            </PublicRoute>
        ),
    },

    // ===== ROUTE 404 (CATCH-ALL) =====
    // Doit être en dernier pour capturer toutes les routes non définies
    {
        path: '*',
        element: (
            <PublicRoute>
                <NotFoundPage/>
            </PublicRoute>
        ),
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router}/>;
};

// ======= UTILITAIRES POUR LA NAVIGATION =====

/**
 * Hook personnalisé pour gérer les erreurs de navigation
 * Utilise React Router pour une navigation SPA optimale
 */
export const useErrorNavigation = () => {
    const navigate = useNavigate();

    return {
        goToForbidden: () => navigate('/403', {replace: true}),
        goToNotFound: () => navigate('/404', {replace: true}),
        goToServerError: () => navigate('/500', {replace: true}),
        goToHome: () => navigate('/', {replace: true}),
        goToLogin: () => navigate('/login', {replace: true}),
    };
};

/**
 * Hook pour gérer les erreurs d'API et rediriger automatiquement
 */
export const useApiErrorHandler = () => {
    const {goToForbidden, goToServerError, goToLogin} = useErrorNavigation();

    const handleApiError = (error: any) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Non autorisé - rediriger vers login
                    goToLogin();
                    break;
                case 403:
                    // Interdit - rediriger vers 403
                    goToForbidden();
                    break;
                case 500:
                case 502:
                case 503:
                    // Erreur serveur - rediriger vers 500
                    goToServerError();
                    break;
                default:
                    console.error('Erreur API:', error);
            }
        } else {
            // Erreur réseau ou autre
            goToServerError();
        }
    };

    return {handleApiError};
};