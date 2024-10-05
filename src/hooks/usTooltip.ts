import { useState } from "react";
import {
  HandleMouseEnter,
  HandleMouseLeave,
  IsTooltip,
} from "@@types/tooltipTypes";

export const useTooltip = (): [
  IsTooltip,
  HandleMouseEnter,
  HandleMouseLeave
] => {
  const [isTooltip, setIsTooltip] = useState<IsTooltip>(null);

  /**
   * @description 특정 요소에 커서를 올리면 팝업창에 text를 띄우기 위한 함수
   * @use 해당 함수를 요소의 onMouseEnter 이벤트에 연결
   */
  const handleMouseEnter = (text: string, e: React.MouseEvent) => {
    const screenWidth = window.innerWidth;
    const tooltipWidth = 350;

    let tooltipX = e.clientX - tooltipWidth / 2;

    if (e.clientX + tooltipWidth / 2 > screenWidth) {
      tooltipX = e.clientX - tooltipWidth;
    } else if (e.clientX - tooltipWidth / 2 < 0) {
      tooltipX = e.clientX;
    }
    setIsTooltip({ text: text, x: tooltipX, y: e.clientY });
  };

  /**
   * @description 커서가 빠져나가면 팝업창을 없애기 위한 함수
   * @use 해당 함수를 요소의 onMouseLeave 이벤트에 연결
   */
  const handleMouseLeave = () => {
    setIsTooltip(null);
  };

  return [isTooltip, handleMouseEnter, handleMouseLeave];
};
