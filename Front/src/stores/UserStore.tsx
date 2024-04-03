import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  bAddress: string;
  name: string;
  setUser: (name: string) => void;
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

const UserStore = create<User>()(
  persist(
    (set) => ({
      isLogin: false,
      setIsLogin: (state) => set(() => ({ isLogin: state })),
      name: "",
      bAddress: "",
      setUser: (name) => {
        set(() => ({ name: name }));
      },
    }),
    { name: "UserStore" }
  )
);

export default UserStore;
