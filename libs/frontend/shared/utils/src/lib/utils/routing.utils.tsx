import { Suspense } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { ApplicationRoute, RoutePath } from '../interfaces';

export const createAbsoluteRoute = (...routes: RoutePath[]) => {
  return `/${routes.join('/')}`;
};

export const createRelativeRoute = (...routes: RoutePath[]) => {
  return `${routes.join('/')}`;
};

export const mapRouting = (routes: ApplicationRoute[]) => {
  return routes.map(({ path, subroutes, redirect, index: isIndex, redirectPath, component: LazyComponent }, index) => (
    <Route
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
    </Route>
  ));
};
