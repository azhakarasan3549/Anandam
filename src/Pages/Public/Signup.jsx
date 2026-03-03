import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, User, Mail, Lock, Eye } from "lucide-react";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

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
              loading ? "bg-gray-400" : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Creating account..." : "Create Account →"}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-600 font-medium">
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