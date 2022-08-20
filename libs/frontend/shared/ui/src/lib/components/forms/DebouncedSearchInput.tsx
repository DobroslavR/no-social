import { TextInput, TextInputProps } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { ChangeEvent, forwardRef, Ref, RefAttributes, useEffect, useState } from 'react';

export type DefaultTextInputProps = TextInputProps & RefAttributes<HTMLInputElement>;

export interface DebouncedSearchInputProps extends DefaultTextInputProps {
  debounceTime?: number;
}

export const DebouncedSearchInput = forwardRef(
  ({ debounceTime = 400, onChange, ...props }: DebouncedSearchInputProps, ref: Ref<HTMLInputElement>) => {
    const [value, setValue] = useState<ChangeEvent<HTMLInputElement> | null>(null);

    const [debouncedValue] = useDebouncedValue(value, debounceTime);

    useEffect(() => {
      if (onChange && debouncedValue) {
        onChange(debouncedValue);
      }
    }, [debouncedValue, onChange]);

    return <TextInput ref={ref} onChange={setValue} {...props} />;
  }
);
