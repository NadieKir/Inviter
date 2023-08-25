import { PropsWithChildren, useEffect, useRef } from 'react';

import styles from './Scrollable.module.scss';

export const Scrollable = ({ children }: PropsWithChildren) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (wrapper === null) return;

    const updateScrollPosition = (e: WheelEvent) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        wrapper.scrollLeft += 30;
        return;
      }

      wrapper.scrollLeft -= 30;
    };

    wrapper.addEventListener('wheel', updateScrollPosition, {
      passive: false,
    });

    return () => {
      wrapper.removeEventListener('wheel', updateScrollPosition);
    };
  }, [wrapperRef]);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {children}
    </div>
  );
};
