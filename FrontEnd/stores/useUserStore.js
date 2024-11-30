import { create } from "zustand";

const useUserStore = create((set) => ({
  currentUser: {},
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
  clearUser: () => {
    set({ currentUser: {} });
  },
}));

export default useUserStore;
