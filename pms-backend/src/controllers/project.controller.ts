import { Request, Response } from "express";
import * as projectService from "../services/project.service";

export async function list(req: Request, res: Response) {
  const { items, meta } = await projectService.listProjects(req.user!, req.query);
  res.json({ success: true, data: items, meta });
}

export async function stats(req: Request, res: Response) {
  const data = await projectService.getDashboardStats(req.user!);
  res.json({ success: true, data });
}

export async function getOne(req: Request, res: Response) {
  const project = await projectService.getProject(req.user!, String(req.params.id));
  res.json({ success: true, data: project });
}

export async function create(req: Request, res: Response) {
  const project = await projectService.createProject(req.user!, req.body);
  res.status(201).json({ success: true, message: "Project created", data: project });
}

export async function update(req: Request, res: Response) {
  const project = await projectService.updateProject(req.user!, String(req.params.id), req.body);
  res.json({ success: true, message: "Project updated", data: project });
}

export async function remove(req: Request, res: Response) {
  await projectService.deleteProject(req.user!, String(req.params.id));
  res.json({ success: true, message: "Project deleted" });
}
