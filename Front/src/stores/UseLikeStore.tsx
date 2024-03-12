import { create } from 'zustand';

interface Like {
    likeList: string[];
    setLikeList: (likeList: string[]) => void;
}

const UseLikeStore = create<Like>(set => ({
    likeList: ["강남구 도곡1동", "성동구 성수1가1동", "강남구 역삼2동"],
    setLikeList: (likeList) => set({ likeList })
}))

export default UseLikeStore;