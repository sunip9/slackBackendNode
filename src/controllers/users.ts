import { Request, Response, NextFunction } from "express";
import UserRepo from "../repos/user-repo";
import multer from "multer";
const upload = multer();

export const getUsers = async (req: Request, res: Response) => {
  const users = await UserRepo.find();
  const { count } = await UserRepo.count();

  res.status(200).json({
    status: 200,
    success: true,
    count: parseInt(count),
    data: users,
  });
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const users = await UserRepo.findById(id);
    if (users.length == 0) {
      res.status(400).json({
        status: 400,
        success: true,
        data: "User Data not found !",
      });
      //   next(err);
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
  const users = await UserRepo.insert(username, password, email);
  res.status(200).json({
    status: 200,
    success: true,
    data: users,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  const users = await UserRepo.update(id, username, password, email);
  res.status(200).json({
    status: 200,
    success: true,
    data: users,
  });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await UserRepo.delete(id);
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
