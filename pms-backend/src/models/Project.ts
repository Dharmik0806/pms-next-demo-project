// Project collection: the main business object of the PMS.
import { Schema, model } from "mongoose";

export const PROJECT_STATUSES = ["planning", "active", "on_hold", "completed"] as const;
export const PROJECT_PRIORITIES = ["low", "medium", "high"] as const;

const projectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, default: "", maxlength: 2000 },
    status: { type: String, enum: PROJECT_STATUSES, default: "planning" },
    priority: { type: String, enum: PROJECT_PRIORITIES, default: "medium" },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    startDate: { type: Date },
    dueDate: { type: Date },
    // Who created the project
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // People working on it
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Speeds up the "my projects" filter.
projectSchema.index({ owner: 1 });
projectSchema.index({ members: 1 });

projectSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: Record<string, unknown>) => {
    ret.id = String(ret._id);
    delete ret._id;
    return ret;
  },
});

export const Project = model("Project", projectSchema);
