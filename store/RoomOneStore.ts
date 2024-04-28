import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {secretStorage, zustandStorage} from './mmkv';
import axios from 'axios';

export interface RoomState {
  componentOne: {
    name: string;
    state: boolean;
    type: string;
  };
  componentTwo: {
    name: string;
    state: boolean;
    type: string;
  };
  componentThree: {
    name: string;
    state: boolean;
    type: string;
  };
  componentFour: {
    name: string;
    state: boolean;
    type: string;
  };
  fetchAllComponentState: () => Promise<void>;
  editComponent: (n: number, newName: string, newType: string) => void;
  changeComponentState: (n: number) => Promise<void>;
}

const initialState: RoomState = {
  componentOne: {
    name: 'Bulb 1',
    state: false,
    type: 'light',
  },
  componentTwo: {
    name: 'Bulb 2',
    state: false,
    type: 'light',
  },
  componentThree: {
    name: 'fan 1',
    state: false,
    type: 'light',
  },
  componentFour: {
    name: 'fan 2',
    state: false,
    type: 'light',
  },
  fetchAllComponentState: async () => {
    try {
      const response = await axios.get(
        'http://192.168.1.2:3000/api/v1/components',
      );
      console.log(response.data);
      console.log('componentStatus fetched');
    } catch (err) {
      console.log(err);
    }
  },
  editComponent: async (n: number) => {
    try {
      console.log(n);
    } catch (error: any) {
      console.log(error.message);
    }
  },
  changeComponentState: async (n: number) => {
    try {
      console.log(n);
    } catch (error: any) {
      console.log(error.message);
    }
  },
};
const RoomStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      editComponent: async (n: number, newName: string, newType: string) => {
        try {
          let cn;
          if (n == 1) {
            cn = 'One';
          } else if (n == 2) {
            cn = 'Two';
          } else if (n == 3) {
            cn = 'Three';
          } else if (n == 4) {
            cn = 'Four';
          } else {
            cn = 'One';
          }
          const componentName = `component${cn}` as keyof RoomState;
          console.log({componentName: componentName});
          set((state: RoomState) => ({
            ...state,
            [componentName]: {
              ...state[componentName],
              name: newName,
              type: newType,
            },
          }));
        } catch (error: any) {
          console.log(error.message);
        }
      },
    }),

    {
      name: 'rStore',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default RoomStore;