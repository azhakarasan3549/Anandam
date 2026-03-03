import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Create Account</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          disabled={loading}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          disabled={loading}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          disabled={loading}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          disabled={loading}
          className="w-full border p-2 rounded"
          required
        />

        <button
          disabled={loading}
          className={`w-full p-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-pink-600"
          }`}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center">
          Already have account?{" "}
          <Link to="/login" className="text-pink-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}