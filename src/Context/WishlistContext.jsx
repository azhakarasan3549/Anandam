import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../DB/Supabaseclient";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Fetch once
  const fetchWishlist = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setWishlistIds([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("wishlist")
      .select("profile_id")
      .eq("user_id", user.id);

    setWishlistIds(data?.map((i) => i.profile_id) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ➕ Add
  const addToWishlist = async (profileId) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return toast.error("Login required");

    const { error } = await supabase.from("wishlist").insert({
      user_id: user.id,
      profile_id: profileId,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setWishlistIds((prev) => [...prev, profileId]);
    
    }
  };

  // ❌ Remove
  const removeFromWishlist = async (profileId) => {
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("profile_id", profileId);

    if (error) {
      toast.error(error.message);
    } else {
      setWishlistIds((prev) =>
        prev.filter((id) => id !== profileId)
      );
   
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        addToWishlist,
        removeFromWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// 🔥 Custom hook
export const useWishlist = () => useContext(WishlistContext);