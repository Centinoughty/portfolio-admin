"use client";

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import Input from "../ui/Input";
import { bric } from "@/lib/font";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  experience: any;
}

export default function ExperienceModal({
  isOpen,
  onClose,
  onRefresh,
  experience,
}: ModalProps) {
  const [loading, setLoading] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
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
    if (experience) {
      setFormData({
        role: experience.role || "",
        company: experience.company || "",
        startDate: experience.startDate
          ? new Date(experience.startDate).toISOString().split("T")[0]
          : "",
        endDate: experience.endDate
          ? new Date(experience.endDate).toISOString().split("T")[0]
          : "",
      });
      setIsCurrent(!experience.endDate);
    } else {
      setFormData({ role: "", company: "", startDate: "", endDate: "" });
      setIsCurrent(false);
    }
  }, [experience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        endDate: isCurrent ? null : formData.endDate,
        id: experience?._id,
      };

      if (experience) {
        await axios.put("/api/experience", dataToSubmit);
      } else {
        await axios.post("/api/experience", dataToSubmit);
      }
      onRefresh();
      onClose();
    } catch (err) {
      alert("Operation failed to save experience");
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
            {experience ? "Edit Experience" : "Add Experience"}
          </h2>
          <button onClick={onClose} className="cursor-pointer">
            <MdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="space-y-4">
            <Input
              label="Role / Position"
              placeholder="e.g. Full Stack Developer"
              value={formData.role}
              onChange={(v) => {
                setFormData({ ...formData, role: v });
              }}
            />

            <Input
              label="Company"
              placeholder="e.g. Google"
              value={formData.company}
              onChange={(v) => {
                setFormData({ ...formData, company: v });
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(v) => {
                  setFormData({ ...formData, startDate: v });
                }}
              />
              <Input
                label="End Date"
                type="date"
                disabled={isCurrent}
                required={!isCurrent}
                value={formData.endDate}
                onChange={(v) => {
                  setFormData({ ...formData, endDate: v });
                }}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none w-fit">
              <input
                type="checkbox"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                className="accent-primary"
              />
              <span className="text-sm text-(--secondary-color)">
                I currently work here
              </span>
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`p-2 w-full bg-(--primary-color) hover:bg-(--primary-color)/90 cursor-pointer duration-300 text-(--accent) ${bric.className} rounded-md`}
            >
              {loading
                ? "Processing..."
                : experience
                ? "Update Experience"
                : "Create Experience"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
