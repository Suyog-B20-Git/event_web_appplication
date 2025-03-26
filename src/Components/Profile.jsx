import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/actions/master/profileActions";

function Profile() { 
  const [localLoading, setLocalLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("personaldetails");
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  // const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error, successMessage } = useSelector((state) => state.profileReducer || {});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      });
      setProfileImage(user.profileImage || "https://via.placeholder.com/100"); 
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setProfileImage(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalLoading(true); 
  
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("phone", formData.phone);
  
    if (selectedFile) {
      formDataToSend.append("profileImage", selectedFile);
    }
  
    try {
      await dispatch(updateUserProfile(formDataToSend)); 
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setLocalLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg mt-20 sm:mt-0">
        <div className="bg-pink-200 p-4 border-b ">
          <h2 className="text-2xl sm:text-3xl text-[#ff2459] font-semibold">Profile</h2>
        </div>

        {successMessage && <p className="text-green-500 text-sm text-center mt-2">{successMessage}</p>}
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

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
            <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full border object-cover" />
          </div>

          {/* Profile Image Upload */}
          <label className="block">
            <span className="text-gray-700">Upload Profile Photo</span>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 border rounded-md p-2" />
          </label>

          {/* Profile Input Fields */}
          <label className="block">
            <span className="text-gray-700">Name</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
          </label>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
          </label>

          <label className="block">
            <span className="text-gray-700">Address</span>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
          </label>

          <label className="block">
            <span className="text-gray-700">Phone</span>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" />
          </label>

          <button type="submit" className="bg-[#ff2459] text-white py-2 px-4 rounded-md">
          {loading ? "Saving..." : "Save"}
        </button>

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
