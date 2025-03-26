import React from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

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
              <span>mail@info.com</span>
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
             

              <Link to={"#"} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff2459] text-white">
              <FaXTwitter />
              </Link>
              <Link to={"#"} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff2459] text-white">
              <FaInstagram />
              </Link>
              <Link to={"#"} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ff2459] text-white">
              <FaFacebook />
              </Link>
            </div>
          </div>

          {/* Useful Links Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Useful Links</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li><Link to="/" className="">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#ff2459]">About</Link></li>
              <li><Link to="/services" className="hover:text-[#ff2459]">Events</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#ff2459]">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-[#ff2459]">Terms & Conditions</Link></li>
              <li><Link to="/team" className="hover:text-[#ff2459]">Expert Event Organiser</Link></li>
         
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-sm mb-4">
              Don’t miss to subscribe to our new feeds, kindly fill the form
              below.
            </p>
            <form className="flex items-center">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 p-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-l-md focus:outline-none"
              />
              <button className="bg-[#ff2459] text-white px-4 md:px-2 lg:px-4 py-2 rounded-r-md">
                <i className="fab fa-telegram-plane"></i>Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

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
      &copy; 2025 EventsNode. All rights reserved. <br /> Product by 
      <a href="https://example.com" className="text-[#ff2459]"> Masterblocks Pvt Ltd </a>
    </p>
    <ul className="flex flex-row gap-2 md:gap-4 mt-2 md:mt-0">
      <li><Link to="#" className="hover:text-[#ff2459]">Terms</Link></li>
      <li><Link to="#" className="hover:text-[#ff2459]">Privacy</Link></li>
      <li><Link to="#" className="hover:text-[#ff2459]">Policy</Link></li>
      <li><Link to="#" className="hover:text-[#ff2459]">Contact</Link></li>
    </ul>
  </div>
</div>

    </footer>
  );
}

export default Footer;
