import {create} from 'zustand'
import { likesArr } from '../utils/likesControl'

export interface LikeStore {
    likes: number[]
    changeLikes: (newLikesArr: number[]) => void
}

const useLikeStore = create<LikeStore>((set) => ({
    likes: likesArr(),
    changeLikes: (newLikesArr) => set(() => ({likes: newLikesArr})),
}));

export default useLikeStore