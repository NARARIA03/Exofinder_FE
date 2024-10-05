import { clickExoplanetNameAtom } from "@store/jotai";
import { useAtom } from "jotai";
import { useCallback } from "react";

export default function GoToHWO() {
  const [clickExoplanetName, setClickExoplanetName] = useAtom(
    clickExoplanetNameAtom
  );

  const handleClick = useCallback(
    () => setClickExoplanetName(""),
    [setClickExoplanetName]
  );

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
