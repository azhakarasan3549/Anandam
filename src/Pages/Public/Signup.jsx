import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, User, Mail, Lock, Eye } from "lucide-react";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const[googleLoading, setGoogleLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

    // 🔐 Google Login
  const handleGoogleLogin = async () => {
    if (googleLoading) return; // ✅ prevent double click
    setGoogleLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
      setGoogleLoading(false);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: form.name,
          role: "user",
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Signup successful! Check email.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 relative">

        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 top-5 text-black"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Header */}
        <div className="text-center space-y-2">
      

          <div className=" mx-auto rounded-full  flex items-center justify-center text-2xl">
             <img
              src="/logo-transperent.png"
              alt="logo"
              className="h-20 w-22 mix-blend-multiply"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Start Your Journey
          </h2>

          <p className="text-gray-500 text-sm">
            Find your perfect match today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="mt-5 space-y-4">

          {/* Full Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="flex items-center border rounded-xl px-3 py-1.5 bg-gray-50">
              <User className="text-gray-400 mr-2" size={16} />
              <input
                name="name"
                type="text"
                placeholder="Enter your full name"
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

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
                placeholder="Create a strong password"
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

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="flex items-center border rounded-xl px-3 py-1.5 bg-gray-50">
              <Lock className="text-gray-400 mr-2" size={16} />
              <input
                name="confirm"
                type="password"
                placeholder="Confirm your password"
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-transparent outline-none text-sm"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white shadow-md transition ${
              loading ? "bg-gray-400" : "bg-[#408A71] hover:bg-[#408a71cf]"
            }`}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>

           {/* Google Login */}
             {/* Google Login */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={ googleLoading}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white transition flex items-center justify-center gap-2 ${
                    googleLoading
                      ? "bg-gray-400"
                      : "bg-black hover:bg-gray-900"
                  }`}
                >
            {/* Google Logo */}
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16px" height="16px">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
              </div>
              {googleLoading ? "Redirecting..." : "Continue with Google"}
            </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-[#408A71] font-medium">
            Log in
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