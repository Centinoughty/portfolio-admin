import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    github: { type: String, required: true },
    tools: [{ type: String }],
    url: { type: String, required: true },
    featured: { type: Boolean, default: false },
    image: { type: String },
  },
  { timestamps: true }
);

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
  },
  { timestamps: true }
);

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const Project = models.Project || model("Project", ProjectSchema);
export const Experience =
  models.Experience || model("Experience", ExperienceSchema);
export const Skill = models.Skill || model("Skill", SkillSchema);
export const User = models.User || model("User", UserSchema);
export const Message = models.Message || model("Message", MessageSchema);
