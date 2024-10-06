import QuestionComp from "@components/tooltip/QuestionComp";
import { OBSERVED_TIP } from "@constants/tooltip";
import {
  clickExoplanetNameAtom,
  hoverExoplanetNameAtom,
  visibleExoplanetAtom,
  visibleStarCountAtom,
} from "@store/jotai";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { FaCaretSquareUp } from "react-icons/fa";
import { FaCaretSquareDown } from "react-icons/fa";

export default function ExoplanetList() {
  const visibleExoplanets = useAtomValue(visibleExoplanetAtom);
  const [uniqueVisibleExoplanets, setUniqueVisibleExoplanets] = useState<
    {
      planetName: string;
      difficult: number;
    }[]
  >([]);

  const visibleStarCount = useAtomValue(visibleStarCountAtom);
  const setHoverExoplanetName = useSetAtom(hoverExoplanetNameAtom);
  const [clickExoplanetName, setClickExoplanetName] = useAtom(
    clickExoplanetNameAtom
  );
  const [isASC, setIsASC] = useState<boolean>(true);

  useEffect(() => {
    const tmp = Array.from(new Set(visibleExoplanets));
    if (isASC) {
      tmp.sort((a, b) => a.difficult - b.difficult);
    } else {
      tmp.sort((a, b) => b.difficult - a.difficult);
    }
    setUniqueVisibleExoplanets(tmp);
  }, [visibleExoplanets, isASC]);

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

  const handleDesc = () => {
    setIsASC(false);
  };
  const handleAsc = () => {
    setIsASC(true);
  };

  if (clickExoplanetName) return null;

  return (
    <div>
      <div className="absolute left-4 bottom-14 w-80 z-50 h-80 rounded-xl bg-slate-400">
        <div className="text-base font-semibold p-2 m-1 mb-8 w-full">
          Number of observed stars: {visibleStarCount}{" "}
          <QuestionComp text={OBSERVED_TIP} />
          <p>Number of observed planets: {uniqueVisibleExoplanets.length} </p>
        </div>
        <div className="absolute top-16 right-2">
          <button onClick={handleDesc}>
            <FaCaretSquareDown
              size={24}
              className={`mx-1 ${isASC && "text-slate-700"}`}
            />
          </button>
          <button onClick={handleAsc}>
            <FaCaretSquareUp
              size={24}
              className={`mx-1 ${!isASC && "text-slate-700"}`}
            />
          </button>
        </div>

        <ul className="bg-opacity-30 overflow-y-scroll max-h-52 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-pt-12">
          {uniqueVisibleExoplanets.map((obj, idx) => (
            <li
              className="text-black p-2 m-1 cursor-pointer flex justify-between border rounded-xl"
              key={`${obj.planetName}${idx}`}
              onMouseEnter={() => handleMouseEnter(obj.planetName)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(obj.planetName)}
            >
              <span className="w-40 truncate">{obj.planetName}</span>
              <span>
                {obj.difficult === 1
                  ? "Easy"
                  : obj.difficult === 2
                  ? "Normal"
                  : "Hard"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
