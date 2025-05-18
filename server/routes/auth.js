import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.js";
import { googleLogin } from "../controllers/googleAuth.js";

const routerAuth = Router()

routerAuth.post("/signup", signUp)
routerAuth.post("/signin", signIn)
routerAuth.post("/google", googleLogin);


export default routerAuth