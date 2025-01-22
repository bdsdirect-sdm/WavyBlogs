import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { Local } from "../environment/env";
import Preference from "../models/Preference";
import Wave from "../models/Wave";
import sendInvitation from "../utils/mailer";
import Request from "../models/Request";
import { loginTemplate } from "../mailTemplate/loginTemplate";
import { signupTemplate } from "../mailTemplate/signuptemplate";
import Friend from "../models/Friend";
import { Op } from "sequelize";
import Admin from "../models/Admin";

const SECRET_KEY:any = Local.SECRET_KEY;

export const adminLogin = async (req: any, res: Response):Promise<any> => {
    try{
        const { email, password } = req.body;
        const admin:any = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        if(admin.is_login){
            return res.status(401).json({ message: "Admin is already logged in" });
        }
        const token = jwt.sign({ id: admin.id }, SECRET_KEY);
        return res.status(200).json({ "token":token , "message": "Admin logged in successfully" , "isAdmin":true, "admin":admin});
    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}

export const adminregister = async (req: any, res: Response):Promise<any> => {
    try{
        const { fullname, email, password,  } = req.body;
        const firstname = fullname.split(" ")[0];
        const lastname = fullname.split(" ")[1];

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({ firstname, lastname, email, password: hashedPassword });
        
        return res.status(200).json({"message":"user created successfully"});
    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}