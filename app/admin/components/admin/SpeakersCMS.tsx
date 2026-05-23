"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  Upload,
  X,
  Linkedin,
  Trash2,
} from "lucide-react";

import Image from "next/image";

interface Speaker {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  linkedinUrl?: string;
}

export default function SpeakersCMS() {

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [speakers, setSpeakers] =
    useState<Speaker[]>([]);

  const fetchSpeakers = async () => {

    const res = await fetch(
      "/api/speakers"
    );

    const data = await res.json();

    setSpeakers(data.speakers || []);
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    try {

      setLoading(true);

      const file =
        e.target.image.files[0];

      if (!file) {
        alert("Please select image");
        return;
      }

      /* Upload image */
      const formData = new FormData();

      formData.append("file", file);

      const uploadRes = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData =
        await uploadRes.json();

      if (!uploadData.success) {

        alert(
          uploadData.message ||
          "Image upload failed"
        );

        return;
      }

      /* Create speaker */
      const res = await fetch(
        "/api/speakers",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: e.target.name.value,
            role: e.target.role.value,
            company:
              e.target.company.value,
            linkedinUrl:
              e.target.linkedinUrl.value,
            image: uploadData.url,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {

        alert(
          data.message ||
          "Failed to add speaker"
        );

        return;
      }

      alert("Speaker added");

      e.target.reset();

      setOpen(false);

      fetchSpeakers();

    } catch (error) {

      console.error(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  const handleDelete = async (
    id: string
  ) => {

    if (
      !confirm(
        "Delete this speaker?"
      )
    ) return;

    try {

      await fetch(
        `/api/speakers/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchSpeakers();

    } catch (error) {

      console.error(error);

      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-8 p-10">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Speakers CMS
          </h1>

          <p className="text-slate-400 mt-2">
            Manage summit speakers
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="
            flex
            items-center
            gap-2
            bg-cyan-500
            hover:bg-cyan-400
            text-black
            font-semibold
            px-5
            py-3
            rounded-2xl
            transition-all
          "
        >
          <Plus size={18} />

          Add Speaker
        </button>
      </div>

      {/* Speakers Grid */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {speakers.map((speaker) => (

          <div
            key={speaker.id}
            className="
              bg-[#06111f]
              border
              border-cyan-500/10
              rounded-3xl
              overflow-hidden
            "
          >

            {/* Image */}
            <div className="
              relative
              h-[320px]
              w-full
            ">
              <Image
                src={speaker.image}
                alt={speaker.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">

              <h2 className="
                text-2xl
                font-bold
                text-white
              ">
                {speaker.name}
              </h2>

              <p className="
                text-cyan-400
                mt-2
                text-sm
              ">
                {speaker.role}
              </p>

              <p className="
                text-slate-400
                mt-2
              ">
                {speaker.company}
              </p>

              {/* Actions */}
              <div className="
                flex
                items-center
                justify-between
                mt-6
              ">

                {speaker.linkedinUrl ? (
                  <a
                    href={
                      speaker.linkedinUrl
                    }
                    target="_blank"
                    className="
                      flex
                      items-center
                      gap-2
                      text-cyan-400
                      hover:text-cyan-300
                    "
                  >
                    <Linkedin size={18} />

                    LinkedIn
                  </a>
                ) : (
                  <div />
                )}

                <button
                  onClick={() =>
                    handleDelete(
                      speaker.id
                    )
                  }
                  className="
                    text-red-400
                    hover:text-red-300
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Modal */}
      {open && (

        <div className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-4
        ">

          <div className="
            relative
            w-full
            max-w-2xl
            rounded-3xl
            bg-[#06111f]
            border
            border-cyan-500/10
            p-8
          ">

            {/* Close */}
            <button
              onClick={() =>
                setOpen(false)
              }
              className="
                absolute
                right-5
                top-5
                text-slate-400
              "
            >
              <X size={22} />
            </button>

            <h2 className="
              text-3xl
              font-bold
              mb-8
            ">
              Add Speaker
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                name="name"
                required
                placeholder="Speaker Name"
                className="
                  w-full
                  bg-[#0a1628]
                  border
                  border-cyan-500/10
                  rounded-2xl
                  p-4
                  outline-none
                "
              />

              <input
                name="role"
                required
                placeholder="Role"
                className="
                  w-full
                  bg-[#0a1628]
                  border
                  border-cyan-500/10
                  rounded-2xl
                  p-4
                  outline-none
                "
              />

              <input
                name="company"
                required
                placeholder="Company"
                className="
                  w-full
                  bg-[#0a1628]
                  border
                  border-cyan-500/10
                  rounded-2xl
                  p-4
                  outline-none
                "
              />

              <input
                name="linkedinUrl"
                placeholder="LinkedIn URL"
                className="
                  w-full
                  bg-[#0a1628]
                  border
                  border-cyan-500/10
                  rounded-2xl
                  p-4
                  outline-none
                "
              />

              {/* Upload */}
              <label
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  border-2
                  border-dashed
                  border-cyan-500/20
                  rounded-2xl
                  p-8
                  cursor-pointer
                  hover:border-cyan-400
                  transition-all
                "
              >
                <Upload
                  size={20}
                  className="
                    text-cyan-400
                  "
                />

                <span className="
                  text-cyan-400
                  underline
                ">
                  Choose Photo
                </span>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                />
              </label>

              <button
                disabled={loading}
                className="
                  w-full
                  bg-cyan-500
                  hover:bg-cyan-400
                  text-black
                  font-semibold
                  py-4
                  rounded-2xl
                  transition-all
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Uploading..."
                  : "Add Speaker"}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}