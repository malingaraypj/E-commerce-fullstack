import { AlignStartVertical } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center ">
      <div className="bg-sky-200 w-12 h-12 flex justify-center items-center rounded-lg m-4">
        <AlignStartVertical color="blue" />
      </div>
      <div className="text-2xl font-bold text-blue-400">E-Commerce</div>
    </div>
  );
}

export default Logo;
