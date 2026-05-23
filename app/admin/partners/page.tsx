"use client";

import { useState } from "react";

export default function PartnersCMS() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const file = e.target.logo.files[0];

      const formData = new FormData();
      formData.append("file", file);

      // Upload to Cloudinary
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadRes.json();

      // Save partner to DB
      await fetch("/api/admin/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: e.target.name.value,
          websiteUrl: e.target.websiteUrl.value,
          logo: uploadData.url,
        }),
      });

      alert("Partner added");

      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020810] text-white p-10">
      
      <div className="max-w-2xl mx-auto bg-[#06111f] border border-cyan-500/10 rounded-2xl p-8">
        
        <h1 className="text-3xl font-bold mb-8">
          Add Media Partner
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Partner Name */}
          <div>
            <label className="block text-sm mb-2 text-slate-400">
              Partner Name
            </label>

            <input
              name="name"
              placeholder="Business Tabloid"
              required
              className="
                w-full
                p-3
                rounded-xl
                bg-[#0a1628]
                border
                border-cyan-500/20
                focus:outline-none
                focus:border-cyan-400
              "
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm mb-2 text-slate-400">
              Website URL
            </label>

            <input
              name="websiteUrl"
              placeholder="https://example.com"
              className="
                w-full
                p-3
                rounded-xl
                bg-[#0a1628]
                border
                border-cyan-500/20
                focus:outline-none
                focus:border-cyan-400
              "
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block text-sm mb-2 text-slate-400">
              Partner Logo
            </label>

            <input
              type="file"
              name="logo"
              accept="image/*"
              required
              className="
                w-full
                p-3
                rounded-xl
                bg-[#0a1628]
                border
                border-cyan-500/20
              "
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-cyan-500
              hover:bg-cyan-400
              text-black
              font-semibold
              py-3
              rounded-xl
              transition-all
              disabled:opacity-50
            "
          >
            {loading ? "Uploading..." : "Add Partner"}
          </button>
        </form>
      </div>
    </div>
  );
}