import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
  areaName : string;
  searchArea : (area: string) => void;
}

const useDongStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        areaName : '역삼동',
        searchArea : (area) => set(() => ({areaName : area})),
        }),
      { name: 'DongStore' },
    ),
  ),
)

export default useDongStore;
