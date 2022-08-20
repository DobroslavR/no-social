import { ApplicationRoute, AuthRoute, Route } from '@frontend/shared/models';
import { lazy } from 'react';

export const PRIVATE_ROUTES: Route[] = [
  {
    path: ApplicationRoute.ROOT,
    component: lazy(() => import('./pages/private/PrivateLayoutPage')),
    subroutes: [
      {
        path: ApplicationRoute.HOME,
        component: lazy(() => import('./pages/private/home/HomePage')),
      },
    ],
  },
];

export const GLOBAL_ROUTES: Route[] = [
  {
    path: ApplicationRoute.ROOT,
    redirect: true,
    redirectPath: ApplicationRoute.AUTH,
  },
  {
    path: '*',
    component: lazy(() => import('./pages/public/NotFoundPage')),
  },
];

export const PUBLIC_ROUTES: Route[] = [
  {
    path: ApplicationRoute.AUTH,
    component: lazy(() => import('./pages/public/authentication/AuthenticationPage')),
    subroutes: [
      {
        index: true,
        redirect: true,
        redirectPath: AuthRoute.SIGN_IN,
      },
      {
        path: AuthRoute.SIGN_IN,
        component: lazy(() => import('./pages/public/authentication/SignInPage')),
      },
      {
        path: AuthRoute.SIGN_UP,
        component: lazy(() => import('./pages/public/authentication/SignUpPage')),
      },
      {
        path: AuthRoute.FORGOT_PASSWORD,
        component: lazy(() => import('./pages/public/authentication/ForgotPasswordPage')),
      },
      {
        path: AuthRoute.CONFIRM_EMAIL_REQUEST,
        component: lazy(() => import('./pages/public/authentication/ConfirmEmailRequestPage')),
      },
      {
        path: AuthRoute.EMAIL_VERIFICATION,
        component: lazy(() => import('./pages/public/authentication/EmailVerificationPage')),
      },
    ],
  },
];
