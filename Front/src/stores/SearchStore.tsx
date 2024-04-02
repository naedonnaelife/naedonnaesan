import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'


type recommendDong = {
  dongName : string;
  dongId : number;
  zzim : boolean;
  distance : number;
  guName : string;
}[]

interface BearState {
  areaName :  string;
  selectedArea : (area: string) => void;
  newsId : string;
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
        areaName : '',
        selectedArea : (area) => set(() => ({areaName : area})),
        newsId : '',
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
