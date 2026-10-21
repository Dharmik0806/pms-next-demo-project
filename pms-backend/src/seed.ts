// Optional: fills the database with demo users and projects.
// Run with:  npm run seed
import mongoose from "mongoose";
import { connectDB } from "./config/db";
import { User } from "./models/User";
import { Project } from "./models/Project";

async function seed() {
  await connectDB();
  await Promise.all([User.deleteMany({}), Project.deleteMany({})]);

  const admin = await User.create({ name: "Admin User", email: "admin@pms.dev", password: "Admin@123", role: "admin" });
  const manager = await User.create({ name: "Maya Manager", email: "manager@pms.dev", password: "Manager@123", role: "manager" });
  const member = await User.create({ name: "Mike Member", email: "member@pms.dev", password: "Member@123", role: "member" });

  const day = 86_400_000;
  await Project.insertMany([
    { name: "Website Redesign", description: "Refresh the marketing site with a faster, cleaner design.", status: "active", priority: "high", progress: 65, dueDate: new Date(Date.now() + 14 * day), owner: manager._id, members: [member._id] },
    { name: "Mobile App v2", description: "Rebuild the mobile app with offline support.", status: "planning", priority: "medium", progress: 10, dueDate: new Date(Date.now() + 60 * day), owner: admin._id, members: [manager._id, member._id] },
    { name: "Billing Migration", description: "Move billing to the new payment provider.", status: "on_hold", priority: "high", progress: 40, dueDate: new Date(Date.now() - 5 * day), owner: manager._id, members: [] },
    { name: "Onboarding Docs", description: "Write help-centre articles for new customers.", status: "completed", priority: "low", progress: 100, dueDate: new Date(Date.now() - 20 * day), owner: admin._id, members: [member._id] },
  ]);

  console.log("🌱 Seeded. Logins: admin@pms.dev / Admin@123, manager@pms.dev / Manager@123, member@pms.dev / Member@123");
  await mongoose.disconnect();
}

seed().catch((e) => { console.error(e); process.exit(1); });
