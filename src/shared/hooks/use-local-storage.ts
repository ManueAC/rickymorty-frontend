import { ApiCharacterResponse } from "@/modules/characters/components/SyncCharactersModal";
import { CharacterType, useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { API_ENTITY_ENUM, fetchAPI } from "./api";

export const useLocalStorage = (
  dataName?: string
): {
  refresh: () => void;
  updateData: (key: string, id: number, data: Record<string, unknown>) => void;
  setData: (key: string, data: Record<string, unknown>) => void;
  setDataAll: (key: string, data: Record<string, unknown>) => void;
  removeData: (key: string) => void;
  setToken: (key: string, data: string) => void;
  storage: ApiCharacterResponse;
} => {
  const store = useStore();
  const [storage, setStorage] = useState<ApiCharacterResponse>();
  const setToken = (key: string, data: string) => {
    localStorage.setItem(key, data);
  };

  const updateState = () => {
    const d = JSON.parse(String(localStorage.getItem(String(dataName))));

    store.addCharacterBulk(d?.results, d?.info);
  };

  const setDataAll = (key: string, data?: Record<string, unknown>) => {
    localStorage.setItem(key, JSON.stringify(data));
    updateState();
  };
  const updateData = (
    key: string,
    id: number,
    data: Record<string, unknown>
  ) => {
    const previous = JSON.parse(String(localStorage.getItem(String(dataName))));
    const item = previous.results.find(
      (monigote: CharacterType) => monigote?.id === id
    );
    const e = previous.results.filter((pr: CharacterType) => pr?.id !== id);
    localStorage.setItem(
      key,
      JSON.stringify({
        info: previous.info,
        results: [...e, data],
      })
    );
    updateState();
  };
  const setData = (key: string, data?: Record<string, unknown>) => {
    const previous = JSON.parse(String(localStorage.getItem(String(dataName))));

    localStorage.setItem(
      key,
      JSON.stringify({
        info: previous.info,
        results: [...previous.results, data],
      })
    );
  };

  const removeData = (key: string) => {
    localStorage.removeItem(key);
  };

  useEffect(() => {
    const makeCall = async () => {
      const data = await fetchAPI(API_ENTITY_ENUM.character);
      setDataAll("characters", data);
    };
    makeCall();
  }, []);

  const refresh = () => {
    const d = JSON.parse(String(localStorage.getItem(String(dataName))));
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