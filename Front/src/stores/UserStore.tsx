import {create} from "zustand";

interface User {
  // user_id: bigint;
  // age: number;
  bAddress: string;
  // gender: string;
  // kakaoId: bigint;
  name: string;
  // roles: string;
  setUser: (name: string) => void;
}

const UserStore = create<User>((set) => ({
  name: "박수빈",
  bAddress: "성수동 성수1가1동",
  setUser: (name) => {
    set(() => ({ name: name }))
  }
}));

export default UserStore;
