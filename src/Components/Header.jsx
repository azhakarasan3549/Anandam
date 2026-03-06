import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ title }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="relative flex items-center justify-center px-6 py-4">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 text-gray-600 hover:text-pink-600 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 tracking-wide">
          {title}
        </h2>

      </div>
    </header>
  );
}