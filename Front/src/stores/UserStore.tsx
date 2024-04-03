import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  // user_id: bigint;
  // age: number;
  bAddress: string;
  // gender: string;
  // kakaoId: bigint;
  name: string;
  // roles: string;
  setUser: (name: string) => void;
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

const UserStore = create<User>()(
  persist(
    (set) => ({
      isLogin: true,
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
