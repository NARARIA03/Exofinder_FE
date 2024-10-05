import { clickExoplanetNameAtom, isCoronaOnAtom } from "@store/jotai";
import { useAtom, useSetAtom } from "jotai";
import { useCallback } from "react";

export default function GoToHWO() {
  const [clickExoplanetName, setClickExoplanetName] = useAtom(
    clickExoplanetNameAtom
  );
  const setIsCoronaOn = useSetAtom(isCoronaOnAtom);

  const handleClick = useCallback(() => {
    setClickExoplanetName("");
    setIsCoronaOn(false);
  }, [setClickExoplanetName, setIsCoronaOn]);

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
