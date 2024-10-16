import { useStore } from "@/store/store";
import { API_ENTITY_ENUM } from "./api";

export function useGetStorageItem(type: API_ENTITY_ENUM, id?: number) {
  const store = useStore();

  const getEntity = () => {
    switch (type) {
      case API_ENTITY_ENUM.character:
        return store.characters;
        break;
      case API_ENTITY_ENUM.episode:
        return store.episodes;
        break;
      default:
        return store.characters;
        break;
    }
  };

  if (!id) return [];
  const getItem = getEntity().results.filter((char) => char.id === id);
  return getItem;
}
