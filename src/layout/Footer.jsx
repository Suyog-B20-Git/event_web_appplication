import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_API_URL;

function Footer() {
  const cities = [
    "Nashik",
    "Bangalore",
    "Delhi",
    "Goa",
    "Hyderabad",
    "Jaipur",
    "Kochi",
    "Mumbai",
    "Pune",
  ];

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const [footerVisible, setFooterVisible] = useState(true);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    setIsLoading(true);
    try {
      const apiResponse = await axios.post(
        `${baseUrl}/api/newsletter/subscribe`,
        { email }
      );
      if (apiResponse.data.statusCode === 200) {
        setShowOtpPopup(true);
        setIsLoading(false);
        toast.success(apiResponse.data.message);
      } else {
        toast.error("Subscription failed.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert(error.response.data.message || "Email not found.");
        } else {
          alert(
            `Error: ${error.response.data.message || "An error occurred."}`
          );
        }
      } else {
        console.error("Error during subscription:", error);
        alert("An error occurred while subscribing.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.warn("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/api/newsletter/verify`, {
        params: { email, otp },
      });
      if (response.data.statusCode === 200) {
        toast.success(response.data.message || "Subscription verified!");
        setShowOtpPopup(false);
        setEmail("");
        setOtp("");
        setIsSubscribed(true);
      } else {
        toast.error(response.data.message || "Verification failed.");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Verification error.";
      toast.error(msg);
    }
  };

  const handleUnsubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter an email address.");
      return;
    }
    try {
      const apiResponse = await axios.delete(
        `${baseUrl}/api/newsletter/unsubscribe`,
        {
          params: { email },
        }
      );
      if (apiResponse.data.statusCode === 200) {
        toast.success(apiResponse.data.message);
        setIsSubscribed(false);
        setEmail("");
      } else {
        toast.error("Unsubscription failed.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error(error.response.data.message || "Email not found.");
        } else {
          toast.error(
            `Error: ${error.response.data.message || "An error occurred."}`
          );
        }
      } else {
        console.error("Error during unsubscription:", error);
        toast.error("An error occurred while unsubscribing.");
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 ">
      {/* Footer CTA Section */}
      <div className="border-b border-gray-700 py-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="flex items-center gap-4">
            <i className="fas fa-map-marker-alt text-orange-500 text-2xl"></i>
            <div>
              <h4 className="font-semibold text-lg">Find us</h4>
              <span>1010 Avenue, SW 54321, Chandigarh</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <i className="fas fa-phone text-orange-500 text-2xl"></i>
            <div>
              <h4 className="font-semibold text-lg">Call us</h4>
              <span>9876543210</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <i className="far fa-envelope-open text-orange-500 text-2xl"></i>
            <div>
              <h4 className="font-semibold text-lg">Mail us</h4>

              <Link to={"https://mail.google.com/Mail/"} className="hover:text-[#ff2459]">
                mail@info.com
                </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content Section */}
      <div className="py-8 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <div className="mb-6">
              <Link to="/" className="inline-block">
                <img
                  src="/assets/staticAssets/logo.png"
                  alt="Logo"
                  className="h-10"
                />
              </Link>
            </div>
            <p className="text-sm leading-6">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-4 flex gap-4">
              <Link
                to={"https://twitter.com/"}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff2459] text-white"
              >
                <FaXTwitter />
              </Link>
              <Link
                to={"https://instagram.com/"}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff2459] text-white"
              >
                <FaInstagram />
              </Link>
              <Link
                to={"https://facebook.com/"}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff2459] text-white"
              >
                <FaFacebook />
              </Link>
            </div>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Useful Links</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link to="/home" className="hover:text-[#ff2459]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/About" className="hover:text-[#ff2459]">
                  About
                </Link>

              </li>
              <li>
                <Link to="/events" className="hover:text-[#ff2459]">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#ff2459]">
                   Blog
                </Link>

              </li>
              <li>
                <Link to="/terms" className="hover:text-[#ff2459]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/organiser" className="hover:text-[#ff2459]">
                  Expert Event Organiser
                </Link>

              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-sm mb-4">
              Don’t miss to subscribe to our new feeds, kindly fill the form
              below.
            </p>
            <form
              className="flex items-center"
              onSubmit={isSubscribed ? handleUnsubscribe : handleSubscribe}
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-[#ff2459] text-white px-4 md:px-2 lg:px-4 py-2 rounded-r-md ${
                  (isSubscribed ? "bg-red-600" : "bg-[#ff2459]",
                  isLoading ? "opacity-50 cursor-not-allowed" : "")
                }`}
              >
                {isSubscribed ? (
                  <>
                    <i className="fas fa-times-circle mr-2"></i>Unsubscribe
                  </>
                ) : (
                  <>
                    <i className="fab fa-telegram-plane mr-2"></i>Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-11/12 max-w-sm p-6 rounded-lg shadow-lg">
            <h2 className="text-black font-semibold mb-4 text-center">
              Enter OTP received on Email
            </h2>
            <div className="flex justify-center gap-2 mb-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className="w-10 h-12 text-2xl text-black text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={otp[index] || ""}
                  onChange={(e) => {
                    const newOtp = otp.split("");
                    newOtp[index] = e.target.value;
                    setOtp(newOtp.join(""));
                    if (e.target.value && e.target.nextSibling) {
                      e.target.nextSibling.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      !otp[index] &&
                      e.target.previousSibling
                    ) {
                      e.target.previousSibling.focus();
                    }
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mb-2"
            >
              Verify
            </button>
            <button
              onClick={() => setShowOtpPopup(false)}
              className="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-400 border-opacity-85"></div>
        </div>
      )}

      {/* Cities Section */}
      <div className="bg-gray-800 py-3 ">
        <div className="container mx-auto">
          <h3 className="text-center font-semibold mb-3">All Cities</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {cities.map((city, index) => (
              <div
                key={index}
                className="text-sm text-gray-400 hover:text-orange-500"
              >
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 py-3 p-3">
        <div className="container mx-auto flex flex-col md:flex-row justify-between text-sm items-center text-center">
          <p>
            &copy; 2015 - 2025 EventsNode. All rights reserved. <br /> A
            <a href="https://masterblocks.co.in/" className="text-[#ff2459]">
              {" "}
              Masterblocks Pvt Ltd{" "}
            </a>{" "}
            Company
          </p>
          <ul className="flex flex-row gap-2 md:gap-4 mt-2 md:mt-0">
            <li>
              <Link to="#" className="hover:text-[#ff2459]">
                Terms
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#ff2459]">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#ff2459]">
                Policy
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-[#ff2459]">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  
  );
}

export default Footer;
