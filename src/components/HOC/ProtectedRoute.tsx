import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { routeConfig } from '@/lib/routerConfig';
import { ERoles } from '@/interfaces/auth/IAuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user} = useAuth();
  const location = useLocation();
  const params = useParams();


  // Find the current route in the routeConfig
  const currentRoute = Object.values(routeConfig).find((route) => {
    // Handle dynamic routes (e.g., `/auth/reset-password/:token`)
    const routePath = route.path.replace(/:\w+/g, (param) => params[param] || '');
    return routePath === location.pathname;
  });

  if (!currentRoute) {
    return <Navigate to="/404" replace />; // Route not found, redirect to 404
  }

  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  // If the route is protected and the user is not authenticated, redirect to login
  if (currentRoute.isProtected && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route requires specific roles and the user doesn't have them, redirect to unauthorized
  if (currentRoute.roles && !currentRoute.roles.includes(user?.role as ERoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;