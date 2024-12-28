import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '@/contexts/UserContextProvider';
import routerMeta from '@/lib/routerMeta';

interface IProtectedRoute {
  children: JSX.Element;
  path: string;
}

const ProtectedRoute = ({ children, path }: IProtectedRoute) => {
  const { isLogin } = useContext(UserContext);
  const currentRoute = Object.values(routerMeta).find(route => route.path === path);

  if (!isLogin && currentRoute?.isAuth) {
    return <Navigate to={routerMeta.SignInPage.path} replace={true} />;
  }

  if (isLogin && (path === routerMeta.SignInPage.path || path === routerMeta.SignUpPage.path)) {
    return <Navigate to={routerMeta.HomePage.path} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;