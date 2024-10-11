import { useStore } from "@/store/store";

export const useGetStorageItem = (id?: number) => {
  const store = useStore();
  if (!id) return null;
  return store.characters.results.filter((char) => char.id === id);
};
