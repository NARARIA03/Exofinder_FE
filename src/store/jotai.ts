import { atom } from "jotai";

export const camZoomAtom = atom<number>(1);

export const diameterAtom = atom<number>(6);

export const visibleExoplanetAtom = atom<string[]>([]);
export const visibleStarCountAtom = atom<number>(0);
