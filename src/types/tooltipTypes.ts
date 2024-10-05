export type IsTooltip = {
  text: string;
  x: number;
  y: number;
} | null;

export type HandleMouseEnter = (text: string, e: React.MouseEvent) => void;

export type HandleMouseLeave = () => void;
