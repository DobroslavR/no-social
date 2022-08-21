import { PostCompose } from '@frontend/posts/ui';
import { PageHead, PageHeadBox } from '@frontend/shared/ui';

import { HomeTimeline } from '../components';

export const HomePage = () => {
  return (
    <>
      <PageHeadBox>
        <PageHead title="Home" />
        <PostCompose />
      </PageHeadBox>

      <HomeTimeline />
    </>
  );
};
