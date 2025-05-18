import User from "../models/User.js";
import { signInValidator, signUpValidator } from "../validation/user.js";
import bycriptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET_CODE = process.env.SECRET_CODE;

export const signUp = async (req, res) => {
  try {
    const { error } = signUpValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const userExists = await User.findOne({
      email: req.body.email,
    });

    if (userExists) {
      return res.status(400).json({
        message: "email da ton tai",
      });
    }

    const hashPassword = await bycriptjs.hash(req.body.password, 10);

    const user = await User.create({
      ...req.body,
      password: hashPassword,
    });
    user.password = undefined;
    return res.status(200).json({
      message: "Dang ky thanh cong",
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = signInValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res.status(404).json({
        message: "Email chua dang ky",
      });
    }

    const isMatch = await bycriptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mat khau khong dung",
      });
    }

    const accessToken = await jwt.sign({ _id: user.id }, SECRET_CODE,{expiresIn: "1d"} );

    user.password = undefined;
    return res.status(200).json({
        message: "Dang nhap thanh cong",
        user,
        accessToken
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
