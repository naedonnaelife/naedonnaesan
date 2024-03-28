import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


type recommendDong = {
  dongName : string;
  dongId : number;
  isLike : boolean;
}[]

interface BearState {
  areaName :  string | null;
  selectedArea : (area: string) => void;
  newsId : number | null;
  selectedNews : (articleId: number) => void;
  likeList : boolean[]
  recommendList : recommendDong,
  updateRecommendList : (response: recommendDong) => void;
  updateLikeList : (updateData:boolean[]) => void;
}

const useSearchStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        areaName : null,
        selectedArea : (area) => set(() => ({areaName : area})),
        newsId : null,
        selectedNews : (articleId) => set(() => ({newsId : articleId})),
        likeList : [],
        recommendList : [],
        updateRecommendList: (response) => set(() => ({
          recommendList: response,
          likeList: response.map(e => e.isLike)
        })),
        updateLikeList: (updateData) => set(()=>({likeList: updateData})),
        }),
      { name: 'SearchStore' },
    ),
  ),
)

export default useSearchStore;
