export const getClarity = (distance: number) => {
  let clarity = -1.17665 * 10 ** -4 * distance + 1.000153;
  clarity = Math.max(0, Math.min(clarity, 1));
  return clarity;
};
