import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Mail, Lock, Eye } from "lucide-react";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 relative">

        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 top-5 text-pink-500"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-lg font-semibold text-gray-800">Soulmate</h1>

          <div className="w-16 h-16 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-2xl">
            ❤️
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back
          </h2>

          <p className="text-gray-500 text-sm">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-5 space-y-4">

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="flex items-center border rounded-xl px-3 py-1.5 bg-gray-50">
              <Mail className="text-gray-400 mr-2" size={16} />
              <input
                name="email"
                type="email"
                placeholder="example@mail.com"
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded-xl px-3 py-1.5 bg-gray-50">
              <Lock className="text-gray-400 mr-2" size={16} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
              <Eye
                size={16}
                className="text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition ${
              loading ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white transition ${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
            }`}
          >
            {loading ? "Redirecting..." : "Continue with Google"}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center mt-5 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-600 font-medium">
            Sign up
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 border-t pt-3 text-[11px] text-gray-400 flex justify-between">
          <span>🔒 SECURE</span>
          <span>🛡 PRIVACY FIRST</span>
          <span>✔ VERIFIED PROFILES</span>
        </div>
      </div>
    </div>
  );
}