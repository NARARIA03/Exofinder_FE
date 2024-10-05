import { visibleExoplanetAtom, visibleStarCountAtom } from "@store/jotai";
import { useAtomValue } from "jotai";

export default function ExoplanetList() {
  const visibleExoplanets = useAtomValue(visibleExoplanetAtom);
  const uniqueVisibleExoplanets = Array.from(new Set(visibleExoplanets));
  const visibleStarCount = useAtomValue(visibleStarCountAtom);

  return (
    <div>
      <div className="absolute left-4 bottom-14 w-48 z-50 h-80 rounded-xl bg-white bg-opacity-40">
        <div className="text-sm font-semibold p-2 m-1 ">
          Number of observed
          <p>planets: {uniqueVisibleExoplanets.length}</p>
          <p> stars: {visibleStarCount}</p>
        </div>
        <ul className="bg-opacity-30 overflow-scroll h-64 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent scroll-pt-12">
          {uniqueVisibleExoplanets.map((name) => (
            <li className="text-black p-2 m-1 cursor-pointer" key={`${name}`}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
