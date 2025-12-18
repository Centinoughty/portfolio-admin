"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import ProjectModal from "@/components/modal/ProjectModal";
import { bric } from "@/lib/font";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    const res = await axios.get("/api/projects");
    setProjects(res.data);
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      await axios.delete(`/api/projects?id=${id}`);
      fetchProjects();
    } catch {
      alert("Failed to delete project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <section className="p-6">
        <div
          className={`flex justify-between items-center mb-8 ${bric.className}`}
        >
          <h2 className="text-4xl font-bold">Projects</h2>
          <button
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="bg-(--primary-color) hover:bg-(--primary-color)/90 duration-300 text-(--accent) flex items-center gap-2 p-2 rounded-md font-bold  cursor-pointer outline-none"
          >
            <MdAdd size={20} /> Add New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj: any) => (
            <div
              key={proj._id}
              className="bg-white p-5 rounded-xl border border-(--secondary-color)/10 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-1">
                <h3 className={`text-lg font-bold ${bric.className}`}>
                  {proj.name}
                </h3>

                <p className="text-xs text-(--secondary-color)/70 truncate">
                  {proj.url || "No live URL"}
                </p>

                {proj.featured && (
                  <span className="inline-block mt-2 text-[10px] bg-(--primary-color)/10 text-(--primary-color) px-2 py-1 rounded-full font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    setEditingProject(proj);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-md cursor-pointer outline-none bg-(--accent) hover:bg-(--secondary-color)/10 transition"
                >
                  <MdEdit className="text-(--primary-color)" />
                  <span className="text-sm">Edit</span>
                </button>

                <button
                  onClick={() => handleDelete(proj._id)}
                  className="flex items-center justify-center px-3 py-2 rounded-md cursor-pointer outline-none bg-red-50 hover:bg-red-100 transition"
                >
                  <MdDelete className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRefresh={fetchProjects}
          project={editingProject}
        />
      </section>
    </>
  );
}
