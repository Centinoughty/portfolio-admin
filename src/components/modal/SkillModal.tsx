"use client";
import { useState, useEffect } from "react";
import { MdClose, MdCloudUpload } from "react-icons/md";
import axios from "axios";
import { uploadToCloudinary } from "@/lib/upload";
import { bric } from "@/lib/font";
import Input from "../ui/Input";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  skill: any;
}

export default function SkillModal({
  isOpen,
  onClose,
  onRefresh,
  skill,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
    if (skill) {
      setFormData({
        name: skill.name || "",
        image: skill.image || "",
      });
    } else {
      setFormData({ name: "", image: "" });
    }
  }, [skill, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLoading(true);
      try {
        const url = await uploadToCloudinary(e.target.files[0]);
        setFormData({ ...formData, image: url });
      } catch (err) {
        alert("Image upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) return alert("Please upload a skill icon");

    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        id: skill?._id,
      };

      if (skill) {
        await axios.put("/api/skills", dataToSubmit);
      } else {
        await axios.post("/api/skills", dataToSubmit);
      }
      onRefresh();
      onClose();
    } catch (err) {
      alert("Failed to save skill");
    } finally {
      setLoading(false);
    }
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
            {skill ? "Edit Skill" : "New Skill"}
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <Input
              label="Technology Name"
              placeholder="e.g. Next.js, Figma, Docker"
              value={formData.name}
              onChange={(v) => {
                setFormData({ ...formData, name: v });
              }}
            />

            <div className="flex flex-col gap-2">
              <label
                className={`text-sm font-medium text-gray-700 ${bric.className}`}
              >
                Icon / Logo
              </label>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-(--primary-color) rounded-lg p-6 bg-(--accent)">
                {formData.image ? (
                  <div className="relative group">
                    <img
                      src={formData.image}
                      alt="preview"
                      className="w-16 h-16 object-contain mb-2"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded">
                      <p className="text-[10px] text-white">Preview</p>
                    </div>
                  </div>
                ) : (
                  <MdCloudUpload size={40} className="text-secondary/40 mb-2" />
                )}

                <label className="cursor-pointer bg-white border border-(--primary-color) text-(--primary-color) px-4 py-1 rounded text-sm font-bold hover:bg-(--primary-color) hover:text-white transition-colors">
                  {loading ? "Uploading..." : "Select File"}
                  <input
                    type="file"
                    hidden
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`p-2 w-full bg-(--primary-color) hover:bg-(--primary-color)/90 cursor-pointer duration-300 text-(--accent) ${bric.className} rounded-md`}
          >
            {loading
              ? "Processing..."
              : skill
              ? "Update Skill"
              : "Create Skill"}
          </button>
        </form>
      </div>
    </div>
  );
}
