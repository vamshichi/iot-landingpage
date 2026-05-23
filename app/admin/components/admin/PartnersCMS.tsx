"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  Upload,
  X,
  Globe,
  Trash2,
} from "lucide-react";

import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logo: string;
  websiteUrl?: string;
}

export default function PartnersCMS() {

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [partners, setPartners] =
    useState<Partner[]>([]);

  const fetchPartners = async () => {

    const res = await fetch(
      "/api/partners"
    );

    const data = await res.json();

    setPartners(data.partners || []);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    try {

      setLoading(true);

      const file =
        e.target.logo.files[0];

      if (!file) {
        alert("Please select logo");
        return;
      }

      /* Upload logo */
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
          "Logo upload failed"
        );

        return;
      }

      /* Save partner */
      const res = await fetch(
        "/api/partners",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name: e.target.name.value,
            websiteUrl:
              e.target.websiteUrl.value,
            logo: uploadData.url,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {

        alert(
          data.message ||
          "Failed to add partner"
        );

        return;
      }

      alert("Partner added");

      e.target.reset();

      setOpen(false);

      fetchPartners();

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
        "Delete this partner?"
      )
    ) return;

    try {

      await fetch(
        `/api/partners/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchPartners();

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
            Partners CMS
          </h1>

          <p className="text-slate-400 mt-2">
            Manage media partners
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

          Add Partner
        </button>
      </div>

      {/* Partners Grid */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {partners.map((partner) => (

          <div
            key={partner.id}
            className="
              bg-[#06111f]
              border
              border-cyan-500/10
              rounded-3xl
              overflow-hidden
            "
          >

            {/* Logo */}
            <div className="
              relative
              h-[220px]
              w-full
              bg-white
              flex
              items-center
              justify-center
              p-10
            ">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="
                  object-contain
                  p-10
                "
              />
            </div>

            {/* Content */}
            <div className="p-6">

              <h2 className="
                text-2xl
                font-bold
                text-white
              ">
                {partner.name}
              </h2>

              {/* Actions */}
              <div className="
                flex
                items-center
                justify-between
                mt-6
              ">

                {partner.websiteUrl ? (
                  <a
                    href={
                      partner.websiteUrl
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
                    <Globe size={18} />

                    Website
                  </a>
                ) : (
                  <div />
                )}

                <button
                  onClick={() =>
                    handleDelete(
                      partner.id
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
              Add Partner
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                name="name"
                required
                placeholder="Partner Name"
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
                name="websiteUrl"
                placeholder="Website URL"
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
                  Choose Logo
                </span>

                <input
                  type="file"
                  name="logo"
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
                  : "Add Partner"}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}