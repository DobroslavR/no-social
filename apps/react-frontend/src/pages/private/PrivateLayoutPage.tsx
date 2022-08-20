import { ModalsProvider } from '@mantine/modals';
import { SpotlightProvider } from '@mantine/spotlight';
import { Outlet } from 'react-router-dom';
import { Search } from 'tabler-icons-react';
import TimeAgo from 'javascript-time-ago';
// @ts-ignore
import en from 'javascript-time-ago/locale/en.json';
import { PrivateLayoutGuard } from '@frontend/authentication/ui';
import { ApplicationRoute } from '@frontend/shared/models';
import { PrivateLayout } from '@frontend/shell/ui';

TimeAgo.addDefaultLocale(en);

export const PrivateLayoutPage = () => {
  return (
    <ModalsProvider>
      <SpotlightProvider
        actions={[]}
        searchIcon={<Search size={18} />}
        searchPlaceholder="Search..."
        shortcut={['mod + X']}
        highlightQuery
        nothingFoundMessage="Nothing found..."
      >
        <PrivateLayoutGuard redirectUrl={ApplicationRoute.AUTH}>
          <PrivateLayout>
            <Outlet></Outlet>
          </PrivateLayout>
        </PrivateLayoutGuard>
      </SpotlightProvider>
    </ModalsProvider>
  );
};

export default PrivateLayoutPage;
