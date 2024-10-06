export default function Crosshair() {
  return (
    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
      <div className="w-[1px] h-4 bg-white"></div>
      <div className="absolute w-4 h-[1px] bg-white"></div>
    </div>
  );
}
