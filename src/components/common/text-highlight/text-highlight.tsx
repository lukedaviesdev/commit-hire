import { useMemo } from 'react';

interface TextHighlightProperties {
  text: string;
  highlight: string;
  className?: string;
}

export const TextHighlight = ({
  text,
  highlight,
  className = '',
}: TextHighlightProperties) => {
  const parts = useMemo(() => {
    if (!highlight.trim()) {
      return [text];
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.split(regex);
  }, [text, highlight]);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span
            key={index}
            className="bg-yellow-200 dark:bg-yellow-800/50 font-medium"
          >
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
};
