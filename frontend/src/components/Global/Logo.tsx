import { AlignStartVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center cursor-pointer"
    >
      <div className="bg-primary/10 w-12 h-12 flex justify-center items-center rounded-lg m-4">
        <AlignStartVertical className="text-primary" />
      </div>
      <div className="text-2xl font-bold text-primary">E-Commerce</div>
    </div>
  );
}

export default Logo;
