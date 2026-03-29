import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient";

export default function AdminHeader() {
  const [greeting, setGreeting] = useState("");
  const [today, setToday] = useState("");
  const [name, setName] = useState("Admin");

  // ✅ Get user name from Supabase
  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      setName(user.user_metadata?.full_name || "Admin");
    }
  };

  // ✅ Update greeting + date
  const updateTime = () => {
    const now = new Date();
    const hour = now.getHours();

    let greet = "Hello";

    if (hour < 12) {
      greet = "Good Morning";
    } else if (hour < 18) {
      greet = "Good Afternoon";
    } else {
      greet = "Good Evening";
    }

    setGreeting(greet);

    const formattedDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    setToday(formattedDate);
  };

  // ✅ Run on load
  useEffect(() => {
    getUser();
    updateTime();

    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-2xl p-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-lg">
      <div className="flex justify-between items-center flex-wrap gap-3">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold">
            {greeting}, {name} 👋
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