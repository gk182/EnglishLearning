import User from "../models/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();
const SECRET_CODE = process.env.SECRET_CODE;
export const checkPermission = async (req,res,next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if(!token){
            return res.status(403).json({
                message: "Bạn chưa đăng nhập!",
            });
        }

        const decode = jwt.verify(token, SECRET_CODE);

        const user = await User.findById(decode._id);

        if (!user) {
            return res.status(403).json({
                message: "Token lỗi",
            });
        }

        if(user.role !== "admin"){
            return res.status(400).json({
                message: "Ban k co quyen",
            });
        }

        next();

    } catch (error) {
        return res.json({
            name: error.name,
            message: error.message
        })
    }
}