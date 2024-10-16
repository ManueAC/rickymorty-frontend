import { ApiCharacterResponse } from "@/modules/characters/components/SyncCharactersModal";
import { CharacterType, useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { API_ENTITY_ENUM, fetchAPI } from "./api";

export const useLocalStorage = (
  dataName: API_ENTITY_ENUM
): {
  refresh: () => void;
  updateData: (key: string, id: number, data: Record<string, unknown>) => void;
  setData: (key: string, data: Record<string, unknown>) => void;
  setDataAll: (key: string, data: Record<string, unknown>) => void;
  removeData: (key: string, id: number) => void;
  setToken: (key: string, data: string) => void;
  storage: ApiCharacterResponse;
} => {
  const store = useStore();
  const [storage, setStorage] = useState<ApiCharacterResponse>();
  const setToken = (key: string, data: string) => {
    localStorage.setItem(key, data);
  };
  const entityOnLocalStorage = `${dataName}s`;

  const updateState = () => {
    const d = JSON.parse(String(localStorage.getItem(entityOnLocalStorage)));

    // actions[dataName](d?.results, d?.info);
    if (dataName === API_ENTITY_ENUM.character) {
      store.addCharacterBulk(d?.results, d?.info);
    } else {
      store.addEpisodeBulk(d?.results, d?.info);
    }
  };

  const setDataAll = (key: string, data?: Record<string, unknown>) => {
    localStorage.setItem(key, JSON.stringify(data));
    updateState();
  };

  const removeData = (key: string, id: number) => {
    const previous = JSON.parse(
      String(localStorage.getItem(entityOnLocalStorage))
    );
    const e = previous.results.filter((pr: CharacterType) => pr?.id !== id);

    localStorage.setItem(
      key,
      JSON.stringify({
        info: previous.info,
        results: [...e],
      })
    );
    updateState();
  };

  const updateData = (
    key: string,
    id: number,
    data: Record<string, unknown>
  ) => {
    const previous = JSON.parse(
      String(localStorage.getItem(entityOnLocalStorage))
    );

    const e = previous.results.filter((pr: CharacterType) => pr?.id !== id);
    localStorage.setItem(
      key,
      JSON.stringify({
        info: previous.info,
        results: [data, ...e],
      })
    );
    updateState();
  };
  const setData = (key: string, data?: Record<string, unknown>) => {
    const previous = JSON.parse(
      String(localStorage.getItem(entityOnLocalStorage))
    );

    localStorage.setItem(
      key,
      JSON.stringify({
        info: previous.info,
        results: [data, ...previous.results],
      })
    );

    updateState();
  };

  useEffect(() => {
    const previous = JSON.parse(
      String(localStorage.getItem(entityOnLocalStorage))
    );

    const isDataAvailable = previous?.results?.length > 0;

    if (!isDataAvailable) {
      const makeCall = async () => {
        // const data = await fetchAPI(API_ENTITY_ENUM.character);
        const data = await fetchAPI(dataName);
        // if (dataName === API_ENTITY_ENUM.character)
        setDataAll(entityOnLocalStorage, data);
      };
      makeCall();
    } else {
      updateState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => {
    const d = JSON.parse(String(localStorage.getItem(entityOnLocalStorage)));
    setStorage(d);
  };

  return {
    refresh,
    setData,
    setToken,
    setDataAll,
    updateData,
    removeData,
    storage: storage ?? {
      info: {
        count: 0,
        next: "",
        pages: 0,
        prev: "",
      },
      results: [],
    },
  };
};
