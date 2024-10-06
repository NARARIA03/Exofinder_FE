import { hoverSpecTypeAtom } from "@store/jotai";
import { useSetAtom } from "jotai";

export default function SpecType() {
  const setHoverSpecType = useSetAtom(hoverSpecTypeAtom);
  const specType = ["O", "B", "A", "F", "G", "K", "M"];

  const handleMouseEnter = (e: string) => {
    setHoverSpecType(e);
  };

  const handleMouseLeave = () => {
    setHoverSpecType("");
  };

  return (
    <ul className="fixed top-2 left-2 bg-red-300">
      {specType.map((e) => (
        <li
          key={e}
          className="cursor-pointer p-2 m-2"
          onMouseEnter={() => handleMouseEnter(e)}
          onMouseLeave={handleMouseLeave}
        >
          {e}
        </li>
      ))}
    </ul>
  );
}
