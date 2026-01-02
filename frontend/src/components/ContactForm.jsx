import React, { useState } from "react";
import axios from "axios";

const ContactForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let err = {};

    if (!form.name) err.name = "Name is required";
    if (!form.phone) err.phone = "Phone is required";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Invalid email";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    await axios.post(
  `${import.meta.env.VITE_API_URL}/api/contacts`,
  form
);


    setForm({ name: "", email: "", phone: "", message: "" });
    setSuccess("Contact saved successfully!");
    onSuccess();
  };

  const isDisabled = !form.name || !form.phone || errors.email;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      
      {/* Name */}
      <div>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          placeholder="Message (optional)"
          value={form.message}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        disabled={isDisabled}
        className={`w-full rounded-lg py-2.5 text-sm font-semibold text-white transition ${
          isDisabled
            ? "cursor-not-allowed bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Submit Contact
      </button>

      {/* Success Message */}
      {success && (
        <p className="text-center text-sm font-medium text-green-600">
          {success}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
