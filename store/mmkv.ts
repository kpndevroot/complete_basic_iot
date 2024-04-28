import {MMKV} from 'react-native-mmkv';

import {StateStorage} from 'zustand/middleware';

export const secretStorage = new MMKV();
export const storage = new MMKV({
  id: 'RoomStorage',
});


export const zustandStorage: StateStorage = {
  setItem: (name: string, value: string): any => {
    return storage.set(name, value);
  },
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string): any => {
    return storage.delete(name);
  },
};