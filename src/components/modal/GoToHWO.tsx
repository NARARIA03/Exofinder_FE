import {
  clickExoplanetNameAtom,
  isCoronaOnAtom,
  selectedExoplanetNameAtom,
  zoomPlanetNamesAtom,
} from "@store/jotai";
import { useAtom, useSetAtom } from "jotai";

export default function GoToHWO() {
  const [clickExoplanetName, setClickExoplanetName] = useAtom(
    clickExoplanetNameAtom
  );
  const setIsCoronaOn = useSetAtom(isCoronaOnAtom);
  const setZoomPlanetNames = useSetAtom(zoomPlanetNamesAtom);
  const setSelectedExoplanetName = useSetAtom(selectedExoplanetNameAtom);

  const handleClick = () => {
    setClickExoplanetName("");
    setIsCoronaOn(false);
    setZoomPlanetNames(null);
    setSelectedExoplanetName("");
  };

  if (!clickExoplanetName) return null;

  return (
    <button
      className="absolute bottom-10 left-10 p-4 bg-white bg-opacity-40 border-none rounded-xl cursor-pointer font-semibold"
      onClick={handleClick}
    >
      Go back HWO
    </button>
  );
}
