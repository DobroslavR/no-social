import { Group, Loader, MantineSize } from '@mantine/core';
import useInfiniteScroll from 'react-infinite-scroll-hook';

export interface InfiniteScrollLoadingProps {
  hasNextPage: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
  size?: MantineSize;
}

export const InfiniteScrollLoading = ({ fetchNextPage, hasNextPage, isLoading, size }: InfiniteScrollLoadingProps) => {
  const [loadMoreReference] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    /*     disabled: !!error, */
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });

  if (isLoading) {
    return (
      <Group position="center">
        <Loader size={size ? size : 'md'} />
      </Group>
    );
  }

  if (!hasNextPage) {
    return null;
  }

  return (
    <Group ref={loadMoreReference} position="center" py="xl">
      <Loader size={size ? size : 'md'} />
    </Group>
  );
};
