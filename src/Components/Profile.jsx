import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Profile() { 
  const [activeTab, setActiveTab] = useState("personaldetails");
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [formData, setFormData] = useState({ name: "", email: "", address: "", phone: "", currentPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.newPassword) newErrors.newPassword = "New password is required";
    if (formData.newPassword !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "phone" && /^\d{10}$/.test(e.target.value)) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSuccessMessage("Form saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg mt-20 sm:mt-0">
        <div className="bg-pink-100 p-4 border-b ">
          <h2 className="text-2xl sm:text-3xl text-[#ff2459] font-semibold">Profile</h2>
        </div>

        {successMessage && <p className="text-green-500 text-sm text-center mt-2">{successMessage}</p>}

        <div className="flex space-x-12 p-4 border-b">
          {["Personal Details", "Security"].map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(tab.toLowerCase().replace(/\s/g, ""))}
              className={`py-2 px-4 text-sm font-semibold ${activeTab === tab.toLowerCase().replace(/\s/g, "") ? "text-[#ff2459]  border-b-2 border-[#ff2459] " : "text-gray-500"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "personaldetails" && (
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <img src={profileImage || "https://via.placeholder.com/100"} alt="Profile" className="w-24 h-24 rounded-full border object-cover" />
            </div>
            <label className="block">
              <span className="text-gray-700">Upload Profile Photo</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 border rounded-md p-2" />
            </label>
            {["name", "email", "phone"].map((field) => (
              <label key={field} className="block">
                <span className="text-gray-700 capitalize">{field}</span>
                <input type={field === "email" ? "email" : "text"} name={field} value={formData[field]} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </label>
            ))}
            <label className="block">
              <span className="text-gray-700">Address</span>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
            </label>
            <button type="submit" className="bg-[#ff2459] text-white py-2 px-4 rounded-md">Save</button>
          </form>
        )}

        {activeTab === "security" && (
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
              <label key={field} className="block relative">
                <span className="text-gray-700 capitalize">{field.replace(/Password/, " Password")}</span>
                <div className="relative">
                  <input
                    type={showPassword[field] ? "text" : "password"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full p-2 border rounded-md pr-10"
                    required
                  />
                  <button type="button" className="absolute right-3 top-3" onClick={() => setShowPassword(prev => ({ ...prev, [field]: !prev[field] }))}>
                    {showPassword[field] ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                  </button>
                </div>
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </label>
            ))}
            <button type="submit" className="bg-[#ff2459]  text-white py-2 px-4 rounded-md">Save</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
