import QuestionComp from "@components/tooltip/QuestionComp";
import {
  CORONA_TIP,
  DIAMETER_TIP,
  ORIENTATION_TIP,
  POSITION_TOOLTIP,
  ZOOM_TIP,
} from "@constants/tooltip";
import {
  ableCoronaOnAtom,
  camZoomAtom,
  clickExoplanetNameAtom,
  diameterAtom,
  diameterPlus1CntAtom,
  hwoRaDecAtom,
  isCoronaOnAtom,
  observationDateAtom,
} from "@store/jotai";
import { useAtom, useAtomValue } from "jotai";
import { useCallback } from "react";

export default function SideSettingBar(): React.JSX.Element {
  const [camZoom, setCamZoom] = useAtom(camZoomAtom);
  const [diameter, setDiameter] = useAtom(diameterAtom);
  const diameterPlus1Cnt = useAtomValue(diameterPlus1CntAtom);
  const clickExoplanetName = useAtomValue(clickExoplanetNameAtom);
  const hwoRaDec = useAtomValue(hwoRaDecAtom);
  const ableCorona = useAtomValue(ableCoronaOnAtom);
  const [isCoronaOn, setIsCoronaOn] = useAtom(isCoronaOnAtom);
  const [observationDate, setObservationDate] = useAtom(observationDateAtom);

  const handleCoronaToggle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsCoronaOn(e.target.checked);
    },
    [setIsCoronaOn]
  );

  return (
    <div className="absolute right-4 top-10 w-60 z-50">
      <div className="bg-slate-400 rounded-xl">
        <div className="flex justify-between">
          <div className="w-60 pt-4 flex flex-col justify-center items-center">
            <p className="text-xl mb-6 font-semibold">HWO Settings</p>
            {clickExoplanetName === "" ? (
              <div>
                <div className="w-full px-2 mb-4">
                  <label htmlFor="zoom" className="block text-black text-md">
                    Zoom <QuestionComp text={ZOOM_TIP} />: {camZoom}
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
                <div className="w-full px-2 mb-4 pb-10 relative">
                  <label
                    htmlFor="diameter"
                    className="block text-black text-md"
                  >
                    Diameter(m) <QuestionComp text={DIAMETER_TIP} />: {diameter}
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
                  <div
                    className="absolute bottom-1 left-0 flex flex-col items-center"
                    style={{
                      left: `calc(${(diameter / 20) * 100}% + 40px)`, // Position the arrow relative to the slider
                    }}
                  >
                    <span className="text-sm text-red-600 text-end">↑</span>
                    <span className="text-sm text-red-600 text-end">
                      +{diameterPlus1Cnt}
                    </span>
                  </div>
                </div>
                <div className="self-start ml-2 mt-2">
                  <div>
                    Orientation <QuestionComp text={ORIENTATION_TIP} />
                  </div>
                  <p className="text-sm">Right Ascension (RA): {hwoRaDec.ra}</p>
                  <p className="text-sm">Declination (DEC): {hwoRaDec.dec}</p>
                </div>

                <div className="self-start ml-2 mt-2">
                  <div>
                    Position <QuestionComp text={POSITION_TOOLTIP} />
                  </div>
                  <div className="text-sm">
                    Observation Date
                    <button
                      className={`text-sm ml-2 px-1 py-0.5 ${
                        observationDate === "Mar"
                          ? "bg-yellow-300"
                          : "bg-slate-600"
                      }`}
                      onClick={() => setObservationDate("Mar")}
                    >
                      1-Mar
                    </button>
                    <button
                      className={`text-sm px-1 py-0.5 ${
                        observationDate === "Sep"
                          ? "bg-yellow-300"
                          : "bg-slate-600"
                      } `}
                      onClick={() => setObservationDate("Sep")}
                    >
                      1-Sep
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-full flex flex-col gap-2 justify-center items-center mb-4">
                  <label
                    className="pl-[0.15rem] mr-2 hover:cursor-pointer"
                    htmlFor="flexSwitchChecked"
                  >
                    Corona Graph On/Off <QuestionComp text={CORONA_TIP} />
                  </label>
                  <input
                    className="mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 disabled:bg-neutral-500 disabled:cursor-not-allowed before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchChecked"
                    checked={isCoronaOn}
                    onChange={handleCoronaToggle}
                    disabled={!ableCorona}
                  />
                </div>
              </div>
            )}

            <div className="self-start ml-2 mt-8">
              <p className="text-xs mb-4">
                What is HWO?
                <a
                  href="https://science.nasa.gov/astrophysics/programs/habitable-worlds-observatory"
                  className="box mx-2
                 text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
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
