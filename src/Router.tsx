import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import routerMeta, { IRouterMeta } from '@/lib/routerMeta';
import LoadingFallback from '@/components/common/LoadingFallback';
import ErrorFallback from '@/components/common/ErrorFallback';
import ProtectedRoute from '@/components/HOC/ProtectedRoute';

// Lazy load layouts
const DefaultLayout = lazy(() => import('@/components/layouts/UserLayout'));
const AdminLayout = lazy(() => import('@/components/layouts/AdminLayout'));
const NoneLayout = lazy(() => import('@/components/layouts/NoneLayout'));

// Lazy load page components
const lazyImport = (pageName: string) => lazy(() => import(`@/pages/${pageName}`));

// Group routes by layout
const groupRoutesByLayout = (routes: Array<{ Component: any; props: IRouterMeta }>) => {
  return routes.reduce((acc, route) => {
    const layout = route.props.layout || 'default';
    if (!acc[layout]) {
      acc[layout] = [];
    }
    acc[layout].push(route);
    return acc;
  }, {} as Record<string, typeof routes>);
};

// Get layout component
const getLayoutComponent = (layout: string) => {
  switch (layout) {
    case 'admin':
      return AdminLayout;
    case 'none':
      return NoneLayout;
    default:
      return DefaultLayout;
  }
};

const Router = () => {
  const { reset } = useQueryErrorResetBoundary();

  // Create route configurations
  const routes = Object.keys(routerMeta).map((componentKey) => ({
    Component: lazyImport(componentKey),
    props: routerMeta[componentKey],
  }));

  // Group routes by layout
  const groupedRoutes = groupRoutesByLayout(routes);

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {Object.entries(groupedRoutes).map(([layout, layoutRoutes]) => {
            const LayoutComponent = getLayoutComponent(layout);
            
            return (
              <Route key={layout} element={<LayoutComponent />}>
                {layoutRoutes.map(({ Component, props }) => (
                  <Route
                    key={props.path}
                    path={props.path}
                    element={
                      <ProtectedRoute path={props.path}>
                        <Suspense fallback={<LoadingFallback />}>
                          <ErrorBoundary
                            onReset={reset}
                            fallbackRender={({ resetErrorBoundary }) => (
                              <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                            )}
                          >
                            <Component />
                          </ErrorBoundary>
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                ))}
              </Route>
            );
          })}
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Router;