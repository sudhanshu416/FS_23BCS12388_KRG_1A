import React, { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function validate() {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';
    if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      alert('Signup successful!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-900">Create Your Account</h2>

        {/** Form Fields */}
        {['name', 'email', 'password', 'confirmPassword'].map((field, idx) => (
          <label key={field} className="block mb-5">
            <span className="text-gray-800 font-medium capitalize">
              {field === 'confirmPassword' ? 'Confirm Password' : field}
            </span>
            <input
              type={field.includes('password') ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field === 'confirmPassword' ? 'password again' : field}`}
              className={`mt-2 block w-full rounded-xl border-2 px-4 py-3 text-red-400 placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-300 ${
                errors[field] ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
          </label>
        ))}

        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-pink-600 transition mt-4 shadow-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
