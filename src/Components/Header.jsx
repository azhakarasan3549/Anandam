import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
      <div className="flex items-center justify-center relative px-4 py-4">

        <button
          onClick={() => navigate(-1)}
          className="absolute left-4"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        <h2 className="font-semibold text-lg">{title}</h2>

      </div>
    </div>
  );
}