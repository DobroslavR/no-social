import { MantineThemeColors } from '@mantine/core';
import { atom } from 'recoil';
import { persistAtomLocalStorage } from './state';

export const ColorThemeState = atom<keyof MantineThemeColors>({
  key: 'ColorThemeState',
  default: 'blue',
  effects_UNSTABLE: [persistAtomLocalStorage],
});
