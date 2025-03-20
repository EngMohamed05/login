import { Request, Response } from "express";

export const getHome = (req: Request, res: Response): void => {
  res.render("index");
};

export const getLogin = (req: Request, res: Response): void => {
  res.render("login");
};

export const getRegister = (req: Request, res: Response): void => {
  res.render("register");
};
