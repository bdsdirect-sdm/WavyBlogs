import { Router } from "express";
import userAuthMiddleware from "../middlewares/userAuth";
import { adminLogin, adminregister } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.post('/adminauth', adminLogin);
adminRouter.post('/adminregister', adminregister);


export default adminRouter;