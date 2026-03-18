export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg">📄</div>
          <div>
            <h1 className="font-semibold text-lg">FormConnect</h1>
            <p className="text-xs text-gray-500">
              Microsoft Forms Integration
            </p>
          </div>
        </div>

        <nav className="flex gap-6 font-semibold text-sm text-gray-700">
          <button className="hover:text-black">Dashboard</button>
          <button className="hover:text-black">Admin</button>
        </nav>
      </div>
    </header>
  );
}