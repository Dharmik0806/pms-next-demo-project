// User collection: account data + hashed password.
import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";
import bcrypt from "bcryptjs";

export const USER_ROLES = ["admin", "manager", "member"] as const;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // select:false → the password hash is never returned unless asked for explicitly
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: USER_ROLES, default: "member" },
    avatar: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Hash the password automatically before saving when it changed.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare a plain password with the stored hash.
userSchema.methods.comparePassword = function (plain: string) {
  return bcrypt.compare(plain, this.password);
};

// Remove sensitive fields and rename _id → id when converting to JSON.
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret: Record<string, unknown>) => {
    ret.id = String(ret._id);
    delete ret._id;
    delete ret.password;
    return ret;
  },
});

export type UserAttrs = InferSchemaType<typeof userSchema>;
export type UserDoc = HydratedDocument<UserAttrs> & {
  comparePassword(plain: string): Promise<boolean>;
};

export const User = model<UserAttrs>("User", userSchema);
