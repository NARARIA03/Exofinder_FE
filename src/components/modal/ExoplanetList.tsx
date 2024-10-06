import QuestionComp from "@components/tooltip/QuestionComp";
import { OBSERVED_TIP } from "@constants/tooltip";
import {
  clickExoplanetNameAtom,
  hoverExoplanetNameAtom,
  visibleExoplanetAtom,
  visibleStarCountAtom,
} from "@store/jotai";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";

export default function ExoplanetList() {
  const visibleExoplanets = useAtomValue(visibleExoplanetAtom);
  const uniqueVisibleExoplanets = Array.from(new Set(visibleExoplanets));
  const visibleStarCount = useAtomValue(visibleStarCountAtom);
  const setHoverExoplanetName = useSetAtom(hoverExoplanetNameAtom);
  const [clickExoplanetName, setClickExoplanetName] = useAtom(
    clickExoplanetNameAtom
  );

  const handleMouseEnter = useCallback(
    (planetName: string) => setHoverExoplanetName(planetName),
    [setHoverExoplanetName]
  );

  const handleMouseLeave = useCallback(
    () => setHoverExoplanetName(""),
    [setHoverExoplanetName]
  );

  const handleClick = useCallback(
    (planetName: string) => setClickExoplanetName(planetName),
    [setClickExoplanetName]
  );

  if (clickExoplanetName) return null;

  return (
    <div>
      <div className="absolute left-4 bottom-14 w-48 z-50 h-80 rounded-xl bg-slate-400">
        <div className="text-sm font-semibold p-2 m-1 ">
          Number of observed <QuestionComp text={OBSERVED_TIP} />
          <p>planets: {uniqueVisibleExoplanets.length}</p>
          <p> stars: {visibleStarCount}</p>
        </div>
        <button
          className="text-sm border"
          onClick={() => handleClick("AF Lep b")}
        >
          discovery Imaging method test
        </button>
        <ul className="bg-opacity-30 overflow-scroll h-64 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-pt-12">
          {uniqueVisibleExoplanets.map((name, idx) => (
            <li
              className="text-black p-2 m-1 cursor-pointer"
              key={`${name}${idx}`}
              onMouseEnter={() => handleMouseEnter(name)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
