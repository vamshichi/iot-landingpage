"use client";

import { useState } from "react";

export default function SpeakersCMS() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const file = e.target.image.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();

    await fetch("/api/admin/speakers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        role: e.target.role.value,
        company: e.target.company.value,
        linkedinUrl: e.target.linkedinUrl.value,
        image: uploadData.url,
      }),
    });

    setLoading(false);

    alert("Speaker added");
  };

  return (
    <div className="p-10 text-white">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-xl"
      >
        <input
          name="name"
          placeholder="Name"
          className="w-full p-3 bg-black border"
        />

        <input
          name="role"
          placeholder="Role"
          className="w-full p-3 bg-black border"
        />

        <input
          name="company"
          placeholder="Company"
          className="w-full p-3 bg-black border"
        />

        <input
          name="linkedinUrl"
          placeholder="LinkedIn URL"
          className="w-full p-3 bg-black border"
        />

        <input
          type="file"
          name="image"
          className="w-full"
        />

        <button
          disabled={loading}
          className="bg-cyan-500 px-6 py-3 rounded-xl"
        >
          {loading ? "Uploading..." : "Add Speaker"}
        </button>
      </form>
    </div>
  );
}