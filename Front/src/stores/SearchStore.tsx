import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


type recommendDong = {
  dongName : string;
  dongPk : number;
  isDongLike : boolean;
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
        recommendList : [{dongName : '성동구 성수1가1동', dongPk : 1, isDongLike : false}, {dongName : '성동구 성수1가2동', dongPk : 2, isDongLike : true}, {dongName : '중구 을지로동', dongPk : 3, isDongLike : true}],
        updateRecommendList : (response) => set(() => ({recommendList : response})),
      }),
      { name: 'SearchStore' },
    ),
  ),
)

export default useSearchStore;
