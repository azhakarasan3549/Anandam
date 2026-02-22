import { useState } from "react";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import {useNavigate } from "react-router-dom";
import supabase from "../../DB/Supabaseclient.js";
import { toast } from "react-toastify";

export default function AddProfile() {
    const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    city: "",
    height: "",
    languages: "",
    profession: "",
    company: "",
    education: "",
    college: "",
    income_range: "",
    mother_tongue: "",
    religion: "",
    family_status: "",
    diet: "",
    photo_url: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let photoUrl = "";

    try {
      // 📸 Upload image....
      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const fileName = `profile_${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("user-image")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("user-image")
          .getPublicUrl(fileName);

        photoUrl = data.publicUrl;
      }

      // 🗄️ Insert profile
      const { error } = await supabase.from("profiles").insert({
        ...profile,
        photo_url: photoUrl,
      });

      if (error) throw error;

      toast.success("Profile saved successfully 🎉");

      // optional refresh after toast..
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="min-h-screen bg-pink-50 pb-10">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-4 bg-white">
          <ArrowLeft
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
          <h1 className="text-lg font-semibold mx-auto">Add New Profile</h1>
        </div>

        <div className="px-4 py-5 space-y-5">
          {/* Image Upload */}
          <label className="block border-2 border-dashed border-pink-300 rounded-2xl p-6 text-center cursor-pointer bg-white">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mx-auto w-32 h-32 rounded-xl object-cover"
              />
            ) : (
              <>
                <div className="mx-auto w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                  <Camera className="text-pink-600" />
                </div>
                <h3 className="mt-3 font-semibold">Upload Profile Photo</h3>
                <p className="text-xs text-gray-500">
                  PNG, JPG or JPEG (Max. 5MB)
                </p>
              </>
            )}
          </label>

          {/* Inputs */}
          <Input label="Full Name" onChange={(v) => handleChange("name", v)} />

          <TwoGrid>
            <Input
              label="Age"
              type="number"
              onChange={(v) => handleChange("age", Number(v))}
            />
            <Select
              label="Gender"
              options={["Male", "Female"]}
              onChange={(v) => handleChange("gender", v)}
            />
          </TwoGrid>

          <IconInput
            label="City"
            icon={<MapPin className="w-4 h-4 text-gray-400" />}
            onChange={(v) => handleChange("city", v)}
          />
          <Input label="Height" onChange={(v) => handleChange("height", v)} />
          <Input label="Languages" onChange={(v) => handleChange("languages", v)} />
          <Input label="Profession" onChange={(v) => handleChange("profession", v)} />
          <Input label="Company" onChange={(v) => handleChange("company", v)} />
          <Input label="Education" onChange={(v) => handleChange("education", v)} />
          <Input label="College" onChange={(v) => handleChange("college", v)} />
          <Input label="Income Range" onChange={(v) => handleChange("income_range", v)} />
          <Input label="Mother Tongue" onChange={(v) => handleChange("mother_tongue", v)} />
          <Input label="Religion" onChange={(v) => handleChange("religion", v)} />
          <Input label="Family Status" onChange={(v) => handleChange("family_status", v)} />
          <Input label="Diet" onChange={(v) => handleChange("diet", v)} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ---------- UI helpers ---------- */

function Input({ label, type = "text", onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        className="w-full mt-1 px-3 py-2 border rounded-xl"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ label, options, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        className="w-full mt-1 px-3 py-2 border rounded-xl"
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function TwoGrid({ children }) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

function IconInput({ label, icon, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-3">{icon}</span>
        <input
          className="w-full pl-9 pr-3 py-2 border rounded-xl"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
