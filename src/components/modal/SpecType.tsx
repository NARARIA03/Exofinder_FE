import QuestionComp from "@components/tooltip/QuestionComp";
import { hoverSpecTypeAtom, spectralCountAtom } from "@store/jotai";
import { useAtomValue, useSetAtom } from "jotai";

export default function SpecType() {
  const setHoverSpecType = useSetAtom(hoverSpecTypeAtom);
  const spectralCount = useAtomValue(spectralCountAtom);
  const specType = ["O", "B", "A", "F", "G", "K", "M"];

  const handleMouseEnter = (e: string) => {
    setHoverSpecType(e);
  };

  const handleMouseLeave = () => {
    setHoverSpecType("");
  };

  return (
    <div className="fixed flex p-3 flex-col top-3 left-3 bg-slate-400 rounded-xl justify-center items-start z-50">
      <div className="font-semibold">
        Spectral Type <QuestionComp text={""} />
      </div>
      <div>Count: {spectralCount}</div>
      <ul className="flex justify-center items-center mx-auto">
        {specType.map((e) => (
          <li
            key={e}
            className="cursor-pointer px-2 py-1 m-2 rounded-md border"
            onMouseEnter={() => handleMouseEnter(e)}
            onMouseLeave={handleMouseLeave}
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
}
