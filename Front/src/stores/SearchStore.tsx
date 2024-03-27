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
  likeList : number[]
  recommendList : recommendDong,
  updateRecommendList : (response: recommendDong) => void;
}

const useSearchStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        areaName : null,
        selectedArea : (area) => set(() => ({areaName : area})),
        newsId : null,
        selectedNews : (articleId) => set(() => ({newsId : articleId})),
        likeList : [1, 2],
        recommendList : [{dongName : '성수1가1동', dongId : 1, isLike : false}, {dongName : '성수1가2동', dongId : 2, isLike : true}, {dongName : '을지로동', dongId : 3, isLike : true}],
        updateRecommendList : (response) => set(() => ({recommendList : response})),
      }),
      { name: 'SearchStore' },
    ),
  ),
)

export default useSearchStore;
