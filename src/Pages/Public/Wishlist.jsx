import { useEffect, useState } from "react";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";
import Header from "../../Components/Header";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch wishlist
  const fetchWishlist = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("Please login");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("wishlist")
      .select(`
        id,
        profiles (
          id,
          name,
          age,
          city,
          photo_url,
          profession
        )
      `)
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
      toast.error(error.message);
    } else {
      setWishlist(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ❌ Remove from wishlist
  const removeFromWishlist = async (profileId) => {
    const confirm = window.confirm("Remove from wishlist?");
    if (!confirm) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("profile_id", profileId);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Removed ❌");
      fetchWishlist();
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-pink-50 p-4">
        <Header title=" ❤️ My Wishlist" />

    

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">
          No wishlist items yet 😢
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => {
            const p = item.profiles;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center"
              >
                {/* PHOTO */}
                <img
                  src={p?.photo_url}
                  alt={p?.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{p?.name}</h2>
                  <p className="text-sm text-gray-600">
                    {p?.age} • {p?.city}
                  </p>
                  <p className="text-xs text-gray-500">
                    {p?.profession}
                  </p>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => removeFromWishlist(p.id)}
                  className="text-red-500 text-xl"
                >
                  ❌
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}