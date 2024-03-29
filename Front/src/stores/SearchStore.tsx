import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


type recommendDong = {
  dongName : string;
  dongId : number;
  zzim : boolean;
  distance : number;
}[]

interface BearState {
  areaName :  string | null;
  selectedArea : (area: string) => void;
  newsId : string | null;
  selectedNews : (id: string) => void;
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
        selectedNews : (id) => set(() => ({newsId : id})),
        likeList : [],
        recommendList : [],
        updateRecommendList: (response) => set(() => ({
          recommendList: response,
          likeList: response.map(e => e.zzim)
        })),
        updateLikeList: (updateData) => set(()=>({likeList: updateData})),
        }),
      { name: 'SearchStore' },
    ),
  ),
)

export default useSearchStore;
