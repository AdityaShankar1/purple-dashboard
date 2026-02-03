"use client";

export default function SidebarButton({ active, onClick, icon, label, sidebarOpen }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${
        sidebarOpen ? "justify-start px-4" : "justify-center px-0"
      } w-full py-3 rounded-lg transition-all duration-200 ${
        active
          ? "bg-blue-500 text-white shadow-lg"
          : "text-blue-100 hover:bg-blue-400/60 hover:text-white"
      }`}
    >
      <span>{icon}</span>
      {sidebarOpen && <span className="ml-3 font-medium">{label}</span>}
    </button>
  );
}
