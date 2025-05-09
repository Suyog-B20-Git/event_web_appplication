import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) return;

    try {
      localStorage.setItem("authToken", token);
      localStorage.setItem("isLogin", JSON.stringify(true));
      toast.success("Login successful!", { position: "top-right" });
      console.log("Token set in local storage:", token);

      const userData = jwt_decode(token);
      console.log("Decoded user:", userData);
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/home");
    } catch (error) {
      console.error("OAuth login failed:", error);
      toast.error("Login failed. Please try again.");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <p>Logging you in with Google...</p>
    </>
  );
};

export default OAuthSuccess;
