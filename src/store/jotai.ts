import { atom } from "jotai";

export const camZoomAtom = atom<number>(1);

export const diameterAtom = atom<number>(6);

export const visibleExoplanetAtom = atom<
  { planetName: string; difficult: number }[]
>([]);
export const visibleStarCountAtom = atom<number>(0);

export const hwoRaDecAtom = atom<{ ra: number; dec: number }>({
  ra: 0,
  dec: 0,
});

export const hoverExoplanetNameAtom = atom<string>("");
export const clickExoplanetNameAtom = atom<string>("");
export const zoomPlanetNamesAtom = atom<string[] | null>(null);
export const selectedExoplanetNameAtom = atom<string>("");

export const isCoronaOnAtom = atom<boolean>(false);
export const ableCoronaOnAtom = atom<boolean>(true);

export const habitableDataAtom = atom<
  | {
      plName: string;
      plOrbsmax: string;
      stSpectype: string;
      stBrightness: string;
      innerBoundHabitableZone: string;
      outerBoundHabitableZone: string;
      habitablePercent: string;
      coronaGraphAffect: string;
    }[]
  | null
>(null);

export const observationDateAtom = atom<"Mar" | "Sep">("Mar");

export const diameterPlus1CntAtom = atom<number>(0);

export const hoverSpecTypeAtom = atom<string>("");

export const spectralCountAtom = atom<number>(0);
