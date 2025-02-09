import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrganiser } from "../ReactRedux/slice/organiserSlice";

const AddOrganiser = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    categories: [],
    description: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrganiser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Organizer Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="categories"
        placeholder="Categories (comma-separated)"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Organizer</button>
    </form>
  );
};

export default AddOrganiser;
