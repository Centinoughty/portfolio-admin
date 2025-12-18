"use client";

import { useState, useEffect } from "react";
import { MdClose, MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { uploadToCloudinary } from "@/lib/upoad";
import Input from "@/components/ui/Input";
import { bric } from "@/lib/font";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  project: any;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onRefresh,
  project,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    github: "",
    url: "",
    tools: "",
    featured: false,
    image: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        tools: project.tools?.join(", ") || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        github: "",
        url: "",
        tools: "",
        featured: false,
        image: "",
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        tools: formData.tools.split(",").map((t) => t.trim()),
        id: project?._id,
      };

      project
        ? await axios.put("/api/projects", dataToSubmit)
        : await axios.post("/api/projects", dataToSubmit);

      onRefresh();
      onClose();
    } catch {
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setLoading(true);
    const url = await uploadToCloudinary(e.target.files[0]);
    setFormData({ ...formData, image: url });
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-lg overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between p-4 bg-(--primary-color) text-(--accent) ${bric.className}`}
        >
          <h2 className="font-bold text-lg">
            {project ? "Edit Project" : "New Project"}
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input
                label="Project Name"
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
              />
            </div>

            <div className="col-span-2">
              <Input
                label="Description"
                textarea
                value={formData.description}
                onChange={(v) => setFormData({ ...formData, description: v })}
              />
            </div>

            <Input
              label="GitHub URL"
              type="url"
              value={formData.github}
              onChange={(v) => setFormData({ ...formData, github: v })}
            />

            <Input
              label="Live URL"
              type="url"
              value={formData.url}
              onChange={(v) => setFormData({ ...formData, url: v })}
            />

            <div className="col-span-2">
              <Input
                label="Tools (comma separated)"
                value={formData.tools}
                onChange={(v) => setFormData({ ...formData, tools: v })}
              />
            </div>
          </div>

          <div
            className={`flex items-center gap-4 py-3 border-y border-dashed ${bric.className}`}
          >
            <label className="flex items-center gap-2 cursor-pointer bg-(--secondary-color)/10 px-4 py-2 rounded text-sm">
              <MdCloudUpload />
              {formData.image ? "Change Image" : "Upload Image"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>

            {formData.image && (
              <span className="text-xs text-green-600 truncate max-w-45">
                Image uploaded
              </span>
            )}

            <div className="ml-auto flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
              />
              <span className="text-sm">Featured</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`p-2 w-full bg-(--primary-color) hover:bg-(--primary-color)/90 cursor-pointer duration-300 text-(--accent) ${bric.className} rounded-md`}
          >
            {loading
              ? "Processing..."
              : project
              ? "Update Project"
              : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
