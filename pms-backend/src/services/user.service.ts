// Business logic for the users module.
import { User } from "../models/User";
import { Project } from "../models/Project";
import { ApiError } from "../utils/ApiError";
import { buildMeta, escapeRegex, getPagination } from "../utils/pagination";

export async function listUsers(query: Record<string, unknown>) {
  const { page, limit, skip } = getPagination(query);
  const filter: Record<string, unknown> = {};

  // ?search=john → match name OR email
  if (query.search) {
    const rx = new RegExp(escapeRegex(String(query.search)), "i");
    filter.$or = [{ name: rx }, { email: rx }];
  }
  // ?role=admin
  if (query.role) filter.role = String(query.role);

  const [items, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);
  return { items, meta: buildMeta(total, page, limit) };
}

export async function updateUserRole(id: string, role: string, actorId: string) {
  if (id === actorId) throw ApiError.badRequest("You cannot change your own role");
  const user = await User.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });
  if (!user) throw ApiError.notFound("User not found");
  return user;
}

export async function setUserActive(id: string, isActive: boolean, actorId: string) {
  if (id === actorId) throw ApiError.badRequest("You cannot disable your own account");
  const user = await User.findByIdAndUpdate(id, { isActive }, { new: true });
  if (!user) throw ApiError.notFound("User not found");
  return user;
}

export async function deleteUser(id: string, actorId: string) {
  if (id === actorId) throw ApiError.badRequest("You cannot delete your own account");
  const user = await User.findByIdAndDelete(id);
  if (!user) throw ApiError.notFound("User not found");
  // Remove the deleted user from every project team
  await Project.updateMany({ members: id }, { $pull: { members: id } });
}
