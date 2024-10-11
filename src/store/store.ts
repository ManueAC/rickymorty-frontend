// 'use client';
import { create } from "zustand";

export interface CharacterType {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}
export interface EpisodeType {
  id: number;
  name: string;
  episode: string;
  characters: CharacterType[];
  created: string;
}

export interface AppStorage {
  currentUser: {
    username: string;
    password: string;
  };
  characters: {
    info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
    };
    results: CharacterType[];
  };
  episodes: EpisodeType[];
}
interface AppActions {
  addCharacter: (data: CharacterType) => void;
  addEpisode: (data: EpisodeType) => void;
  updateCharacter: (data: CharacterType, id?: number) => void;
  addCharacterBulk: (
    data: CharacterType[],
    info: AppStorage["characters"]["info"]
  ) => void;
  saveUser: (data: AppStorage["currentUser"]) => void
}
const initialState: AppStorage["characters"] = {
  info: {
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  },
  results: [],
};
export const useStore = create<AppStorage & AppActions>((set, get) => ({
  currentUser: {
    password: "",
    username: "",
  },
  episodes: [],
  characters: initialState,

  // ====== ==== actions
  saveUser: (data: AppStorage["currentUser"]) => {
    return set({
      currentUser: {
        username: data.username,
        password: data.password,
      },
    });
  },
  addCharacter: (data: CharacterType) => {
    const find = get().characters.results.find((char) => char.id);
    return set({});
  },

  updateCharacter: (data: CharacterType, id?: number) => {
    const find = get().characters.results.find((char) => char.id === data.id);
    if (find)
      set((state) => {
        const newUpdated = (state.characters.results[data.id] = {
          ...data,
        });

        return {
          characters: {
            info: state.characters.info,
            results: [...state.characters.results, newUpdated],
          },
        };
      });
    return set({});
  },

  addCharacterBulk: (
    data: CharacterType[],
    info: AppStorage["characters"]["info"]
  ) => {
    return set({
      characters: {
        info: info,
        results: data,
      },
    });
  },

  addEpisode: (data: EpisodeType) => {},
}));

// ========= Dialog managers
export type DialogStoreType = {
  openSyncDialog: boolean;
  openCreateCharacterDialog: boolean;
  openCharacterFilters: boolean;
};
export type DialogStoreActions = {
  handleSyncDialog: () => void;
  handleCreateCharacterDialog: () => void;
  handleCharacterFilterDialog: () => void;
};

export const useDialog = create<DialogStoreType & DialogStoreActions>(
  (set, get) => ({
    openSyncDialog: false,
    openCreateCharacterDialog: false,
    openCharacterFilters: false,

    handleSyncDialog: () => {
      return set((state) => ({
        openSyncDialog: !state.openSyncDialog,
      }));
    },
    handleCreateCharacterDialog: () => {
      return set((state) => ({
        openCreateCharacterDialog: !state.openCreateCharacterDialog,
      }));
    },
    handleCharacterFilterDialog: () => {
      return set((state) => ({
        openCharacterFilters: !state.openCharacterFilters,
      }));
    },
  })
);

//
