"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ExperienceModal from "@/components/modal/ExperienceModal";
import { bric } from "@/lib/font";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const fetchExp = async () => {
    const res = await axios.get("/api/experience");
    setExperiences(res.data);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this experience?"
    );
    if (!confirmed) return;

    try {
      await axios.delete(`/api/experience?id=${id}`);
      fetchExp();
    } catch {
      alert("Failed to delete experience");
    }
  };

  useEffect(() => {
    fetchExp();
  }, []);

  return (
    <section className="p-6">
      <div
        className={`flex justify-between items-center mb-8 ${bric.className}`}
      >
        <h2 className="text-4xl font-bold">Experience</h2>
        <button
          onClick={() => {
            setEditingExp(null);
            setIsModalOpen(true);
          }}
          className="bg-(--primary-color) hover:bg-(--primary-color)/90 duration-300 text-(--accent) flex items-center gap-2 p-2 rounded-md font-bold  cursor-pointer outline-none"
        >
          <MdAdd size={20} /> Add Experience
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp: any) => (
          <div
            key={exp._id}
            className="bg-white p-5 rounded-xl border border-(--secondary-color)/10 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div className="space-y-1">
              <h3 className={`text-lg font-bold ${bric.className}`}>
                {exp.role}
              </h3>

              <p className="text-sm text-(--secondary-color) font-semibold">
                {exp.company}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setEditingExp(exp);
                  setIsModalOpen(true);
                }}
                className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md cursor-pointer outline-none bg-(--accent) hover:bg-(--secondary-color)/10 transition"
              >
                <MdEdit className="text-(--primary-color)" />
                <span className="text-sm">Edit</span>
              </button>

              <button
                onClick={() => handleDelete(exp._id)}
                className="flex items-center justify-center px-3 py-2 rounded-md cursor-pointer outline-none bg-red-50 hover:bg-red-100 transition"
              >
                <MdDelete className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRefresh={fetchExp}
        experience={editingExp}
      />
    </section>
  );
}
