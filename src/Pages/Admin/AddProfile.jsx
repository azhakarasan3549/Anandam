import { useState } from "react";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../../DB/Supabaseclient.js";
import { toast } from "react-toastify";

export default function AddProfile() {
  const navigate = useNavigate();

  const initialProfile = {
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
    religion: "",
    caste: "", // ✅ ADDED
    zodiac_sign: "",
    star: "",
    lagna: "",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ CAPITALIZE FUNCTION
  const capitalize = (text) => {
    if (!text) return "";
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleChange = (field, value) => {
    let formattedValue = value;

    // ✅ NAME & CITY → UPPERCASE
    if (field === "name" || field === "city") {
      formattedValue = value.toUpperCase();
    } else {
      // ✅ OTHER FIELDS → CAPITALIZE
      formattedValue = capitalize(value);
    }

    setProfile((prev) => ({ ...prev, [field]: formattedValue }));
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
      // Upload image
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

      // Insert profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          ...profile,
          age: profile.age ? parseInt(profile.age) : null,
          photo_url: photoUrl,
        })
        .select()
        .single();

      if (profileError) throw profileError;

      const profileId = profileData.id;

      // Insert contact
      const { error: contactError } = await supabase
        .from("contacts")
        .insert({
          profile_id: profileId,
          mobile_number: mobile,
          address: address,
        });

      if (contactError) throw contactError;

      toast.success("Profile + Contact saved 🎉");

      // Reset
      setProfile(initialProfile);
      setMobile("");
      setAddress("");
      setImageFile(null);
      setImagePreview(null);

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50">

      {/* HEADER */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 py-4 shadow-sm">
        <ArrowLeft
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />

        <h1 className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">
          Add New Profile
        </h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto px-4 py-6 space-y-5 pb-20"
      >

        {/* IMAGE */}
        <label className="block border-2 border-dashed border-pink-300 rounded-2xl p-6 text-center cursor-pointer bg-white">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />

          {imagePreview ? (
            <img src={imagePreview} className="mx-auto w-32 h-32 rounded-xl object-cover" />
          ) : (
            <>
              <div className="mx-auto w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                <Camera className="text-pink-600" />
              </div>
              <h3 className="mt-3 font-semibold">Upload Profile Photo</h3>
            </>
          )}
        </label>

        {/* BASIC */}
        <Input label="Full Name" value={profile.name} onChange={(v) => handleChange("name", v)} />

        <TwoGrid>
          <Input label="Age" type="number" value={profile.age} onChange={(v) => handleChange("age", v)} />
          <Select label="Gender" value={profile.gender} options={["Male", "Female"]} onChange={(v) => handleChange("gender", v)} />
        </TwoGrid>

        <IconInput
          label="City"
          value={profile.city}
          icon={<MapPin className="w-4 h-4 text-gray-400" />}
          onChange={(v) => handleChange("city", v)}
        />

        {/* CONTACT */}
        <Input label="Mobile Number" value={mobile} onChange={setMobile} />
        <TextArea label="Address" value={address} onChange={setAddress} />

        {/* OTHER */}
        <Input label="Height" value={profile.height} onChange={(v) => handleChange("height", v)} />
        <Input label="Languages" value={profile.languages} onChange={(v) => handleChange("languages", v)} />
        <Input label="Profession" value={profile.profession} onChange={(v) => handleChange("profession", v)} />
        <Input label="Company" value={profile.company} onChange={(v) => handleChange("company", v)} />
        <Input label="Education" value={profile.education} onChange={(v) => handleChange("education", v)} />
        <Input label="College" value={profile.college} onChange={(v) => handleChange("college", v)} />
        <Input label="Income Range" value={profile.income_range} onChange={(v) => handleChange("income_range", v)} />

        {/* RELIGION */}
        <Input label="Religion" value={profile.religion} onChange={(v) => handleChange("religion", v)} />

        {/* ✅ NEW CASTE FIELD */}
        <Input label="Caste" value={profile.caste} onChange={(v) => handleChange("caste", v)} />

        <Input label="Zodiac Sign" value={profile.zodiac_sign} onChange={(v) => handleChange("zodiac_sign", v)} />
        <Input label="Star" value={profile.star} onChange={(v) => handleChange("star", v)} />
        <Input label="Lagna" value={profile.lagna} onChange={(v) => handleChange("lagna", v)} />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 text-white py-3 rounded-xl font-semibold"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        className="w-full mt-1 px-3 py-2 border rounded-xl"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        rows={4}
        value={value}
        className="w-full mt-1 px-3 py-2 border rounded-xl resize-none"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
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

function IconInput({ label, icon, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="relative mt-1">
        <span className="absolute left-3 top-3">{icon}</span>
        <input
          value={value}
          className="w-full pl-9 pr-3 py-2 border rounded-xl"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}