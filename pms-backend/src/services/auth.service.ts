// Business logic for authentication. Controllers call these functions;
// nothing here knows about req/res, so it is easy to test and reuse.
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { signToken } from "../utils/token";

export async function registerUser(data: { name: string; email: string; password: string }) {
  const exists = await User.findOne({ email: data.email.toLowerCase() });
  if (exists) throw ApiError.conflict("An account with this email already exists");

  // The very first account becomes the admin so you can manage everyone else.
  const isFirstUser = (await User.countDocuments()) === 0;
  const user = await User.create({ ...data, role: isFirstUser ? "admin" : "member" });

  return { user, token: signToken({ id: String(user._id), role: user.role }) };
}

export async function loginUser(email: string, password: string) {
  // `+password` because the field is hidden by default in the schema
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await (user as any).comparePassword(password))) {
    throw ApiError.unauthorized("Incorrect email or password");
  }
  if (!user.isActive) throw ApiError.forbidden("This account has been disabled");

  return { user, token: signToken({ id: String(user._id), role: user.role }) };
}

export async function updateProfile(userId: string, data: { name?: string; avatar?: string }) {
  const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
  if (!user) throw ApiError.notFound("User not found");
  return user;
}

export async function changePassword(userId: string, current: string, next: string) {
  const user = await User.findById(userId).select("+password");
  if (!user) throw ApiError.notFound("User not found");
  if (!(await (user as any).comparePassword(current))) {
    throw ApiError.badRequest("Current password is incorrect");
  }
  user.password = next; // hashed by the pre-save hook
  await user.save();
}
