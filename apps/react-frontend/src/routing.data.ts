import { RootRoute, Route } from '@no-social/frontend/shared/models';
import { lazy } from 'react';

export const PRIVATE_ROUTES: Route[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/private/PrivateLayoutPage')),
  },
];

export const GLOBAL_ROUTES: Route[] = [
  {
    path: '/',
    redirect: true,
    redirectPath: RootRoute.AUTH,
  },
  {
    path: '*',
    component: lazy(() => import('./pages/public/NotFoundPage')),
  },
];

export const PUBLIC_ROUTES: Route[] = [
  {
    path: RootRoute.AUTH,
    component: lazy(() => import('./pages/public/authentication/AuthPage')),
  },
];
