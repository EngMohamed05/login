import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { UserModel } from "../models/User";

export const loginController = asyncHandler(async function (
  req: Request,
  res: Response
): Promise<void> {
  const { user, password } = req.body;
  const existingUser = await UserModel.findOne({ user });
  if (!existingUser) {
    res.status(400).render("login", { error: "Invalid credentials" });
    return;
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    res.status(400).render("login", { error: "Invalid credentials" });
    return;
  }

  res.redirect("/");
});
