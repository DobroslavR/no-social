import { Route, RoutePath } from '@frontend/shared/models';
import { Suspense } from 'react';
import { Route as ReactRoute, Navigate } from 'react-router-dom';

export const createAbsoluteRoute = (...routes: RoutePath[]) => {
  return `/${routes.join('/')}`;
};

export const createRelativeRoute = (...routes: RoutePath[]) => {
  return `${routes.join('/')}`;
};

export const mapRouting = (routes: Route[]) => {
  return routes.map(({ path, subroutes, redirect, index: isIndex, redirectPath, component: LazyComponent }, index) => (
    <ReactRoute
      key={path ? path : redirectPath ? redirectPath : index}
      path={path}
      index={isIndex}
      element={
        redirect ? (
          <Navigate to={redirectPath as string} />
        ) : (
          LazyComponent && (
            <Suspense
              fallback={
                <></>
                /*  <Center
                sx={() => ({
                  height: '100vh',
                })}
              >
                <Loader />
              </Center> */
              }
            >
              <LazyComponent />
            </Suspense>
          )
        )
      }
    >
      {subroutes && mapRouting(subroutes)}
    </ReactRoute>
  ));
};
