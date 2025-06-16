// OAuthFailure.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login"); // redirect back to login page
  }, [navigate]);

  return <p>Google login failed. Redirecting...</p>;
};

export default OAuthFailure;
