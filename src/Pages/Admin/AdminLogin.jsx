import { useState } from "react";
import supabase from "../../DB/Supabaseclient.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    // Check admin role
    const role = data.user.user_metadata?.role;

    if (role !== "admin") {
      toast.error("You are not admin ❌");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    toast.success("Admin Login Success ✅");
    setLoading(false);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow w-96"
      >
        <h2 className="text-xl font-bold text-center mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-2 rounded mb-3"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-pink-600 text-white py-2 rounded flex justify-center items-center gap-2 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
