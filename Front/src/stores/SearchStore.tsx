import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
  areaName :  string | null;
  selectedArea : (area: string) => void;
}

const useSearchStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        areaName : 'happy',
        selectedArea : (area) => set(() => ({areaName : area}))
      }),
      { name: 'SearchStore' },
    ),
  ),
)

export default useSearchStore;