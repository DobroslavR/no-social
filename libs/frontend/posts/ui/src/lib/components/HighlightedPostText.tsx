import { TextProps } from '@mantine/core';
import { Text } from '@mantine/core';
import Highlighter from 'react-highlight-words';

export interface HighlightedPostTextProps extends TextProps {
  text?: string | null;
}

const mentionRegex = /@[A-Za-z0-9_-]*/g;
const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g;
const hashtagRegex = /(#[a-zA-Z0-9]+,? *)*#[a-zA-Z0-9]+/g;

export const HighlightedPostText = (_props: HighlightedPostTextProps) => {
  const { text, ...props } = _props;

  if (!text) {
    return null;
  }

  return (
    <Text
      sx={(theme) => ({
        whiteSpace: 'pre-line',
        '& .highlighted-words': {
          color: theme.colors[theme.primaryColor][4],
          background: 'none',
          fontWeight: 400,
        },
      })}
      component="pre"
      size="sm"
      my={0}
      {...props}
    >
      <Highlighter
        highlightClassName="highlighted-words"
        searchWords={[mentionRegex, urlRegex, hashtagRegex]}
        textToHighlight={text}
      />
    </Text>
  );
};
