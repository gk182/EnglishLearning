import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const SECRET_CODE = process.env.SECRET_CODE;

export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      const generatedUserName = name?.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 10000);
      user = await User.create({
        email,
        userName: generatedUserName,
        password: "GOOGLE_LOGIN", // không dùng thực tế, chỉ để pass validation
      });
    }

    const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Đăng nhập Google thành công",
      user,
      accessToken,
    });
  } catch (error) {
    return res.status(400).json({ message: "Xác thực Google thất bại", error });
  }
};