import React, { PropsWithChildren } from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

export const EmotionCacheProvider = ({ children }: PropsWithChildren) => {
  const cache = React.useMemo(
    () =>
      createCache({
        key: 'with-tailwind',
        insertionPoint: document.querySelector('title')!,
      }),
    [],
  );

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
