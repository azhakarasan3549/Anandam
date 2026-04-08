import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import supabase from "../../DB/Supabaseclient.js";
import { toast } from "react-toastify";

export default function EditProfile() {
  const { id } = useParams();
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
    religion: "",
    caste: "",
    zodiac_sign: "",
    star: "",
    lagna: "",
    photo_url: "",
  });

  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔐 Admin Check
  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) navigate("/admin-login");
    };
    checkAdmin();
  }, []);

  // 📥 Load profile + contact
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Profile not found");
      return;
    }

    setProfile(profileData);
    setImagePreview(profileData.photo_url || null);

    // Fetch contact
    const { data: contactData } = await supabase
      .from("contacts")
      .select("*")
      .eq("profile_id", id)
      .single();

    if (contactData) {
      setMobile(contactData.mobile_number || "");
      setAddress(contactData.address || "");
    }

    setLoading(false);
  };

  // ✅ Capitalize helper
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
    if (field === "name" || field === "city") {
      formattedValue = value.toUpperCase();
    } else {
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

  // ✅ Update profile + contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let photoUrl = profile.photo_url;

      // ✅ If new image selected → delete old → upload new
      if (imageFile) {

        // Delete old image from storage
        if (profile.photo_url) {
          const oldFileName = profile.photo_url.split("/").pop();
          const { error: deleteError } = await supabase.storage
            .from("user-image")
            .remove([oldFileName]);

          if (deleteError) {
            console.warn("Old image delete failed:", deleteError.message);
          }
        }

        // Upload new image
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

      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          ...profile,
          age: profile.age ? parseInt(profile.age) : null,
          photo_url: photoUrl,
        })
        .eq("id", id);

      if (profileError) throw profileError;

      // Update contact
      const { error: contactError } = await supabase
        .from("contacts")
        .update({
          mobile_number: mobile,
          address: address,
        })
        .eq("profile_id", id);

      if (contactError) throw contactError;

      toast.success("Profile updated successfully 🎉");
      navigate("/admin");

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-black">

      {/* HEADER */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white px-4 text-black py-4 shadow-sm">
        <ArrowLeft
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-lg font-semibold absolute left-1/2 -translate-x-1/2">
          Edit Profile
        </h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto px-4 py-6 space-y-5 pb-20"
      >

        {/* IMAGE */}
        <label className="block border-2 border-dashed border-black rounded-2xl p-6 text-center cursor-pointer bg-white">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          {imagePreview ? (
            <img src={imagePreview} className="mx-auto w-32 h-32 rounded-xl object-cover" />
          ) : (
            <>
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center">
                <Camera className="text-black" />
              </div>
              <h3 className="mt-3 font-semibold text-black">Upload Profile Photo</h3>
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
        <Input label="Caste" value={profile.caste} onChange={(v) => handleChange("caste", v)} />
        <Input label="Zodiac Sign" value={profile.zodiac_sign} onChange={(v) => handleChange("zodiac_sign", v)} />
        <Input label="Star" value={profile.star} onChange={(v) => handleChange("star", v)} />
        <Input label="Lagna" value={profile.lagna} onChange={(v) => handleChange("lagna", v)} />

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-black text-white py-3 rounded-xl font-semibold"
        >
          {saving ? "Updating..." : "Update Profile"}
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
        value={value || ""}
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
        value={value || ""}
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
        value={value || ""}
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
          value={value || ""}
          className="w-full pl-9 pr-3 py-2 border rounded-xl"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}