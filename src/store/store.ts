// 'use client';
import { EPISODE_STATUS_ENUM } from "@/constants";
import { create } from "zustand";

type ApiResponseInfo = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};
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
  status: EPISODE_STATUS_ENUM;
  air_date: string;
}

export interface AppStorage {
  currentUser: {
    username: string;
    password: string;
  };
  characters: {
    info: ApiResponseInfo;
    results: CharacterType[];
  };
  episodes: {
    info: ApiResponseInfo;
    results: EpisodeType[];
  };
}
interface AppActions {
  // ====== Characters actions
  addCharacter: (data: CharacterType) => void;
  updateCharacter: (data: CharacterType, id?: number) => void;
  addCharacterBulk: (
    data: CharacterType[],
    info: AppStorage["characters"]["info"]
  ) => void;
  // ====== Characters actions
  addEpisode: (data: EpisodeType) => void;
  addEpisodeBulk: (
    data: EpisodeType[],
    info: AppStorage["episodes"]["info"]
  ) => void;
  // ====== Users actions
  saveUser: (data: AppStorage["currentUser"]) => void;
}

const initialEpisodeState: AppStorage["episodes"] = {
  info: {
    count: 0,
    pages: 0,
    next: "",
    prev: "",
  },
  results: [],
};

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
  episodes: initialEpisodeState,
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
  addCharacter: () => {
    return set({});
  },

  updateCharacter: (data: CharacterType) => {
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
  addEpisodeBulk: (
    data: EpisodeType[],
    info: AppStorage["episodes"]["info"]
  ) => {
    const addStatusToEpisodes = data?.map((episode) => ({
      ...episode,
      status: EPISODE_STATUS_ENUM.ACTIVE,
    }));
    return set({
      episodes: {
        info: info,
        results: addStatusToEpisodes,
      },
    });
  },

  addEpisode: () => {},
}));

// ========= Dialog managers
export type DialogStoreType = {
  openSyncDialog: boolean;
  openCreateCharacterDialog: boolean;
  openCharacterFilters: boolean;
  openDeleteCharacter: boolean;
  // Episodes
  openDeleteEpisode: boolean;
  openCreateEpisodeDialog: boolean;
};
export type DialogStoreActions = {
  // Characters
  handleSyncDialog: () => void;
  handleCreateCharacterDialog: () => void;
  handleCharacterFilterDialog: () => void;
  handleCharDeleteDialog: () => void;
  handleDeleteEpisodeDialog: () => void;

  // Episodes
  handleCreateEpisodeDialog: () => void;
};

export const useDialog = create<DialogStoreType & DialogStoreActions>(
  (set) => ({
    // ================== Statuses
    // Characters
    openSyncDialog: false,
    openCreateCharacterDialog: false,
    openCharacterFilters: false,
    openDeleteCharacter: false,

    // Episodes
    openDeleteEpisode: false,
    openCreateEpisodeDialog: false,

    // ================== Actions
    // Characters
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
    handleCharDeleteDialog: () => {
      return set((state) => ({
        openDeleteCharacter: !state.openDeleteCharacter,
      }));
    },

    // Episodes
    handleDeleteEpisodeDialog: () => {
      return set((state) => ({
        openDeleteEpisode: !state.openDeleteEpisode,
      }));
    },
    handleCreateEpisodeDialog: () => {
      return set((state) => ({
        openCreateEpisodeDialog: !state.openCreateEpisodeDialog,
      }));
    },
  })
);

//
