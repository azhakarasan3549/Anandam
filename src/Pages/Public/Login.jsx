import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Login successful");
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={loading}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          disabled={loading}
        />

        <button
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-pink-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-black"
          }`}
        >
          {loading ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}