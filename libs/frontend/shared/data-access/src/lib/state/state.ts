import { recoilPersist } from 'recoil-persist';

export const { persistAtom: persistAtomLocalStorage } = recoilPersist({
  key: 'recoil-persist',
});
