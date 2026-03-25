import { CalendarDays } from "lucide-react";

export default function AdminHeader({ name = "Admin" }) {

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full rounded-2xl p-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">

      <div className="flex justify-between items-center flex-wrap gap-3">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            Good Evening, {name} 👋
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            Here's what's happening today in your workspace.
          </p>
        </div>

        {/* RIGHT SIDE (DATE) */}
        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl text-sm">
          <CalendarDays className="w-4 h-4" />
          <span>{today}</span>
        </div>

      </div>
    </div>
  );
}