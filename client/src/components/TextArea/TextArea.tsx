import { AllHTMLAttributes, useEffect, useRef } from 'react';
import classNames from 'classnames';

import styles from './TextArea.module.scss';

type TextAreaProps = {
  maxLetterCount?: number;
} & AllHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({
  maxLetterCount,
  ...nativeHtmlProps
}: TextAreaProps): JSX.Element => {
  const { value, className } = nativeHtmlProps;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // TODO: doesnt work with initial values (small initial height)
  useEffect(() => {
    if (textAreaRef.current) {
      const { current: textArea } = textAreaRef;
      textArea.style.height = 'auto';
      const scrollHeight = textArea.scrollHeight;

      console.log(scrollHeight); // 0 on init

      textArea.style.height = scrollHeight + 15 + 'px';
    }
  }, [textAreaRef.current, value]);

  const letterCount = value?.toString().length ?? 0;

  return (
    <div className={styles.container}>
      <textarea
        {...nativeHtmlProps}
        ref={textAreaRef}
        rows={1}
        maxLength={maxLetterCount}
        className={classNames(className, styles.textArea)}
      />
      {maxLetterCount && maxLetterCount > 0 && (
        <div className={styles.counter}>
          <span className={styles.letterCount}>{letterCount}</span> /{' '}
          {maxLetterCount}
        </div>
      )}
    </div>
  );
};
