import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="bg-blue-600 text-white p-2 rounded-lg">📄</div>
          <div>
            <h1 className="font-semibold text-lg">FormConnect</h1>
            <p className="text-xs text-gray-500">
              Microsoft Forms Integration
            </p>
          </div>
        </div>

        <nav className="flex gap-6 font-semibold text-sm text-gray-700">
          <button
            onClick={() => navigate("/")}
            className="hover:text-black transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="hover:text-black transition"
          >
            Administrador
          </button>
        </nav>
      </div>
    </header>
  );
}