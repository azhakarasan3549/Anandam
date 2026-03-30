import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";

export default function UserCount() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch ONLY count
  const fetchUserCount = async () => {
    setLoading(true);

    const { count, error } = await supabase
      .from("admin_users_view") // ✅ your VIEW
      .select("*", { count: "exact", head: true });

    if (error) {
      console.log(error);
      toast.error(error.message);
    } else {
      setCount(count);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUserCount();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
        <div className="flex items-center justify-center ">

            <div className="text-center">
                <p className=" font-bold text-white">Users</p>

                <p className=" font-bold text-white mt-2">
                {count}
                </p>
            </div>

         </div>
  );
}