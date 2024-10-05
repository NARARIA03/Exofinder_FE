import { IsTooltip } from "@@types/tooltipTypes";

interface Props {
  tooltip: IsTooltip;
}

export default function TooltipComp({ tooltip }: Props) {
  if (!tooltip) return null;

  return (
    <div
      className="fixed w-80 bg-gray-700 text-white text-sm rounded-xl p-2 z-50 font-normal"
      style={{ left: tooltip.x, top: tooltip.y + 30 }}
    >
      {tooltip.text}
    </div>
  );
}
