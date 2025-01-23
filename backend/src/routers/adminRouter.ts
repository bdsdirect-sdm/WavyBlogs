import { Router } from "express";
import userAuthMiddleware from "../middlewares/userAuth";
import { adminLogin, adminLogout, adminregister, editUser, editUserstatus, editWavestatus, getAllUsers, getAllwaves, getCounts } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.post('/adminauth', adminLogin);
adminRouter.post('/adminregister', adminregister);

adminRouter.put('/adminlogout', userAuthMiddleware, adminLogout);
adminRouter.put('/editwavestatus', userAuthMiddleware, editWavestatus);
adminRouter.put('/edituserstatus', userAuthMiddleware, editUserstatus);
adminRouter.put('/edituser', userAuthMiddleware, editUser);

adminRouter.get('/allusers', userAuthMiddleware, getAllUsers);
adminRouter.get('/allwaves', userAuthMiddleware, getAllwaves);
adminRouter.get('/getdata', userAuthMiddleware, getCounts);

export default adminRouter;