import { camZoomAtom, diameterAtom, hwoRaDecAtom } from "@store/jotai";
import { useAtom, useAtomValue } from "jotai";

export default function SideSettingBar(): React.JSX.Element {
  const [camZoom, setCamZoom] = useAtom(camZoomAtom);
  const [diameter, setDiameter] = useAtom(diameterAtom);
  const hwoRaDec = useAtomValue(hwoRaDecAtom);

  return (
    <div className="absolute right-4 top-10 w-60 z-50">
      <div className="bg-white rounded-xl bg-opacity-40">
        <div className="flex justify-between">
          <div className="w-60 pt-4 flex flex-col justify-center items-center">
            <p className="text-xl mb-6 font-semibold">HWO Settings</p>
            <div className="w-full px-2 mb-4">
              <label htmlFor="zoom" className="block text-black text-md">
                Zoom: {camZoom}
              </label>
              <input
                type="range"
                id="zoom"
                name="zoom"
                min={1}
                max={60}
                step={0.1}
                value={camZoom}
                onChange={(e) => setCamZoom(Number(e.target.value))}
                className="px-2 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer bg-opacity-30"
              />
            </div>
            <div className="w-full px-2 mb-4">
              <label htmlFor="diameter" className="block text-black text-md">
                Diameter(m): {diameter}
              </label>
              <input
                type="range"
                id="diameter"
                name="diameter"
                min={0}
                max={15}
                step={0.1}
                value={diameter}
                onChange={(e) => setDiameter(Number(e.target.value))}
                className="px-2 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer bg-opacity-30"
              />
            </div>
            <div className="self-start ml-2 mt-2">
              <div>Orientation</div>
              <p className="text-sm">Right Ascension (RA): {hwoRaDec.ra}</p>
              <p className="text-sm">Declination (DEC): {hwoRaDec.dec}</p>
            </div>
            <div className="self-start ml-2 mt-8">
              <p className="text-xs mb-4">
                What is HWO?
                <a
                  href="https://science.nasa.gov/astrophysics/programs/habitable-worlds-observatory"
                  className=" box mx-2
                 text-blue-500"
                >
                  click here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
