import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_API_URL;