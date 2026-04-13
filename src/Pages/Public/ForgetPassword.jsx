import { useState } from "react";
import supabase from "../../DB/Supabaseclient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://anandam-orpin.vercel.app/reset-password", // ✅ change to your domain in production
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset link sent to your email! 📧");
      navigate("/login");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-gray-500 mb-6 hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        <h1 className="text-xl font-bold mb-2">Forget Password</h1>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full mt-1 px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

      </div>
    </div>
  );
}