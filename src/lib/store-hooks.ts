import { create, StoreApi, UseBoundStore } from "zustand";

export const useActionStore: UseBoundStore<
  StoreApi<{
    count: number;
    updateCount: (value: number) => void;
  }>
> = create((set) => ({
  count: 0,
  updateCount: async (value: number) => {
    "use server";
    return set({
      count: value,
    });
  },
}));
