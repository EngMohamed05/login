import { createUser } from "../models/User";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

export const registerController = asyncHandler(async function (
  req: Request,
  res: Response
): Promise<void> {
  const user = await createUser(req.body);
  if (!user) {
    res.status(400).render("register", { error: "User creation failed" });
    return;
  }
  res.redirect("/");
});
