import { useTooltip } from "@hooks/usTooltip";
import { FaRegQuestionCircle } from "react-icons/fa";
import TooltipComp from "./TooltipComp";

interface Props {
  text: string;
}

export default function QuestionComp({ text }: Props) {
  const [isTooltip, handleMouseEnter, handleMouseLeave] = useTooltip();

  return (
    <>
      <FaRegQuestionCircle
        className="inline mr-2"
        onMouseEnter={(e) => handleMouseEnter(text, e)}
        onMouseLeave={handleMouseLeave}
      />
      {isTooltip && <TooltipComp tooltip={isTooltip} />}
    </>
  );
}
