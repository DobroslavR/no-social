import { LazyExoticComponent } from 'react';

export type RoutePath = string | '*' | '/';

export interface Route {
  path?: RoutePath;
  redirect?: boolean;
  redirectPath?: string;
  component?: LazyExoticComponent<() => JSX.Element>;
  subroutes?: Route[];
  index?: boolean;
}
