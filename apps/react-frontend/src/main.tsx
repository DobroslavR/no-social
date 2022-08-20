import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { GLOBAL_ROUTES, PUBLIC_ROUTES, PRIVATE_ROUTES } from './routing.data';
import { mapRouting } from '@frontend/shared/utils';
import Application from './Application';

const GlobalRoutes = mapRouting(GLOBAL_ROUTES);
const PublicRoutes = mapRouting(PUBLIC_ROUTES);
const PrivateRoutes = mapRouting(PRIVATE_ROUTES);

render(
  <StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <Application>
          <Routes>
            {GlobalRoutes} {PublicRoutes} {PrivateRoutes}
          </Routes>
        </Application>
      </RecoilRoot>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);
