import React, { useState } from "react";

export default function FormWithTable() {
  const [form, setForm] = useState({ name: "", email: "", course: "" });
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.course.trim()) {
      setError("All fields are required.");
      return false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(form.email)) {
      setError("Please enter a valid email.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newRow = { id: Date.now(), ...form };
    setRows((prev) => [newRow, ...prev]);
    setForm({ name: "", email: "", course: "" });
  };

  const handleDelete = (id) => {
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        📚 Course Registration Portal
      </h2>

      {/* Stats */}
      <div className="flex justify-center mb-6">
        <div className="bg-emerald-100 border border-emerald-200 text-emerald-800 px-6 py-3 rounded-xl shadow">
          Total submissions:{" "}
          <span className="font-semibold">{rows.length}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-emerald-50 shadow rounded-xl p-6 space-y-4"
        >
          {error && (
            <div className="text-sm text-red-700 bg-red-100 border border-red-200 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1 text-emerald-700">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-emerald-700">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-emerald-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
          <label className="block text-sm font-medium mb-1 text-emerald-700">
            Course
          </label>
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            className="w-full border border-emerald-200 rounded-lg px-3 py-2 h-10 
                      bg-gray-50 text-gray-900 
                      focus:outline-none focus:ring-2 focus:ring-emerald-300"
            placeholder="Course name"
          />
        </div>


          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
            >
              Register
            </button>
            <button
              type="button"
              onClick={() => setForm({ name: "", email: "", course: "" })}
              className="px-4 py-2 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="bg-white shadow rounded-xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-emerald-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-emerald-700">
                  #
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-emerald-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-emerald-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-emerald-700">
                  Course
                </th>
                <th className="px-4 py-2 text-right text-sm font-semibold text-emerald-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    className="px-4 py-4 text-center text-gray-500"
                    colSpan={5}
                  >
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                rows.map((r, idx) => (
                  <tr
                    key={r.id}
                    className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {rows.length - idx}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900">
                      {r.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {r.email}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {r.course}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm"
                      >
                        ✕ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
