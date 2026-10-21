// Controllers are thin: read the request, call a service, send the response.
import { Request, Response } from "express";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response) {
  const { user, token } = await authService.registerUser(req.body);
  res.status(201).json({ success: true, message: "Account created", data: { user, token } });
}

export async function login(req: Request, res: Response) {
  const { user, token } = await authService.loginUser(req.body.email, req.body.password);
  res.json({ success: true, message: "Welcome back", data: { user, token } });
}

// Returns the currently logged-in user (used by the frontend on page load)
export async function me(req: Request, res: Response) {
  res.json({ success: true, data: req.user });
}

export async function updateMe(req: Request, res: Response) {
  const user = await authService.updateProfile(String(req.user!._id), req.body);
  res.json({ success: true, message: "Profile updated", data: user });
}

export async function changePassword(req: Request, res: Response) {
  await authService.changePassword(String(req.user!._id), req.body.currentPassword, req.body.newPassword);
  res.json({ success: true, message: "Password changed" });
}
