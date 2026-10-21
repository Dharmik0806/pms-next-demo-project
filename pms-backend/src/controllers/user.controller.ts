import { Request, Response } from "express";
import * as userService from "../services/user.service";

export async function list(req: Request, res: Response) {
  const { items, meta } = await userService.listUsers(req.query);
  res.json({ success: true, data: items, meta });
}

export async function updateRole(req: Request, res: Response) {
  const user = await userService.updateUserRole(String(req.params.id), req.body.role, String(req.user!._id));
  res.json({ success: true, message: "Role updated", data: user });
}

export async function setActive(req: Request, res: Response) {
  const user = await userService.setUserActive(String(req.params.id), !!req.body.isActive, String(req.user!._id));
  res.json({ success: true, message: user.isActive ? "User enabled" : "User disabled", data: user });
}

export async function remove(req: Request, res: Response) {
  await userService.deleteUser(String(req.params.id), String(req.user!._id));
  res.json({ success: true, message: "User deleted" });
}
