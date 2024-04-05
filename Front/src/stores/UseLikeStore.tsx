import { create } from 'zustand';

interface Like {
    likeList: string[];
    setLikeList: (likeList: string[]) => void;
}

const UseLikeStore = create<Like>(set => ({
    likeList: [],
    setLikeList: (likeList) => set({ likeList })
}))

export default UseLikeStore;