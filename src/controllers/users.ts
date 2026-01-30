import { Request, Response, NextFunction } from "express";
import { getUserService } from "../container";

const userService = getUserService();

export const getUsers = async (_req: Request, res: Response) => {
  const { count, users } = await userService.getAllUsers();

  res.status(200).json({
    status: 200,
    success: true,
    count,
    data: users,
  });
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const users = await userService.getUserById(parseInt(id));
    if (users.length == 0) {
      res.status(400).json({
        status: 400,
        success: true,
        data: "User Data not found !",
      });
      return;
    }
    res.status(200).json({
      status: 200,
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const users = await userService.createUser(username, password, email);
  res.status(200).json({
    status: 200,
    success: true,
    data: users,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  const users = await userService.updateUser(
    parseInt(id),
    username,
    password,
    email,
  );
  res.status(200).json({
    status: 200,
    success: true,
    data: users,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await userService.deleteUser(parseInt(id));
  if (users.length == 0) {
    res.status(400).json({
      status: 400,
      success: false,
      data: "User Not found !",
    });
  } else {
    res.status(200).json({
      status: 200,
      success: true,
      data: users,
    });
  }
};
