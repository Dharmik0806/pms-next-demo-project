// Business logic for projects + dashboard statistics.
import { QueryFilter } from "mongoose";
import { Project } from "../models/Project";
import { User, UserDoc } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { buildMeta, escapeRegex, getPagination } from "../utils/pagination";

// Admins see everything. Everyone else only sees projects they own or belong to.
function visibleTo(user: UserDoc): QueryFilter<unknown> {
  if (user.role === "admin") return {};
  return { $or: [{ owner: user._id }, { members: user._id }] };
}

// Only the owner or an admin may edit / delete a project.
function assertCanManage(user: UserDoc, project: { owner: unknown }) {
  const isOwner = String(project.owner) === String(user._id) ||
    String((project.owner as any)?._id) === String(user._id);
  if (user.role !== "admin" && !isOwner) {
    throw ApiError.forbidden("Only the project owner or an admin can do this");
  }
}

// Fill in owner/member details so the UI can show names and avatars.
const populate = [
  { path: "owner", select: "name email avatar" },
  { path: "members", select: "name email avatar" },
];

export async function listProjects(user: UserDoc, query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const filter: QueryFilter<unknown> = { ...visibleTo(user) };

  if (query.status) filter.status = String(query.status);
  if (query.priority) filter.priority = String(query.priority);
  if (query.search) {
    const rx = new RegExp(escapeRegex(String(query.search)), "i");
    // `$and` keeps the visibility rule AND adds the search rule
    filter.$and = [{ $or: [{ name: rx }, { description: rx }] }];
  }

  const [items, total] = await Promise.all([
    Project.find(filter).populate(populate).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    Project.countDocuments(filter),
  ]);
  return { items, meta: buildMeta(total, page, limit) };
}

export async function getProject(user: UserDoc, id: string) {
  const project = await Project.findOne({ _id: id, ...visibleTo(user) }).populate(populate);
  if (!project) throw ApiError.notFound("Project not found");
  return project;
}

export async function createProject(user: UserDoc, data: Record<string, unknown>) {
  const project = await Project.create({ ...data, owner: user._id });
  return project.populate(populate);
}

export async function updateProject(user: UserDoc, id: string, data: Record<string, unknown>) {
  const project = await Project.findById(id);
  if (!project) throw ApiError.notFound("Project not found");
  assertCanManage(user, project);

  // Never let the client change the owner
  delete data.owner;
  project.set(data);
  await project.save();
  return project.populate(populate);
}

export async function deleteProject(user: UserDoc, id: string) {
  const project = await Project.findById(id);
  if (!project) throw ApiError.notFound("Project not found");
  assertCanManage(user, project);
  await project.deleteOne();
}

// Numbers for the dashboard cards and charts.
export async function getDashboardStats(user: UserDoc) {
  const scope = visibleTo(user);
  const now = new Date();

  const [byStatus, byPriority, overdue, recent, totalUsers] = await Promise.all([
    Project.aggregate([{ $match: scope }, { $group: { _id: "$status", count: { $sum: 1 } } }]),
    Project.aggregate([{ $match: scope }, { $group: { _id: "$priority", count: { $sum: 1 } } }]),
    Project.countDocuments({ ...scope, status: { $ne: "completed" }, dueDate: { $lt: now } }),
    Project.find(scope).populate(populate).sort({ updatedAt: -1 }).limit(5),
    user.role === "admin" ? User.countDocuments() : Promise.resolve(null),
  ]);

  // Turn [{_id:'active',count:2}] into { active: 2 }
  const toMap = (rows: { _id: string; count: number }[]) =>
    rows.reduce<Record<string, number>>((acc, r) => ({ ...acc, [r._id]: r.count }), {});

  const status = toMap(byStatus);
  const total = Object.values(status).reduce((a, b) => a + b, 0);

  return { total, overdue, status, priority: toMap(byPriority), recent, totalUsers };
}
