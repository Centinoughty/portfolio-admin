"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { bric } from "@/lib/font";
import SkillModal from "@/components/modal/SkillModal";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const fetchSkills = async () => {
    try {
      const res = await axios.get("/api/skills");
      setSkills(res.data);
    } catch (error) {
      console.log("Fetching skills failed");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this skill?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/skills?id=${id}`);
      fetchSkills();
    } catch {
      alert("Failed to delete skill");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <>
      <section className="p-6">
        <div
          className={`flex justify-between items-center mb-8 ${bric.className}`}
        >
          <h2 className="text-4xl font-bold">Skills</h2>
          <button
            onClick={() => {
              setEditingSkill(null);
              setIsModalOpen(true);
            }}
            className="bg-(--primary-color) hover:bg-(--primary-color)/90 duration-300 text-(--accent) flex items-center gap-2 px-4 py-2 rounded-md font-bold  cursor-pointer outline-none"
          >
            <MdAdd size={20} /> Add Skill
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {skills.map((skill: any) => (
            <div
              key={skill._id}
              className="bg-white p-5 rounded-xl border border-(--secondary-color)/10 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className={`text-sm font-bold ${bric.className}`}>
                  {skill.name}
                </h3>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingSkill(skill);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md cursor-pointer outline-none bg-(--accent) hover:bg-(--secondary-color)/10 transition"
                >
                  <MdEdit className="text-(--primary-color)" />
                  <span className="text-xs">Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(skill._id)}
                  className="flex items-center justify-center px-3 py-2 rounded-md cursor-pointer outline-none bg-red-50 hover:bg-red-100 transition"
                >
                  <MdDelete className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <SkillModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRefresh={fetchSkills}
          skill={editingSkill}
        />
      </section>
    </>
  );
}
