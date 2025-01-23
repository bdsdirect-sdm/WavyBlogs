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
        const admin = await Admin.findOne({ where: { email } });
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
        await admin.update({is_login:true})
        const token = jwt.sign({ uuid: admin.uuid }, SECRET_KEY);
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

export const adminLogout = async (req: any, res: Response):Promise<any> => {
    try{
        const { uuid } = req.user;
        const admin = await Admin.findOne({ where: { uuid } });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        await admin.update({is_login:false});
        return res.status(200).json({ "message": "Admin logged out successfully" });
    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}



export const editWavestatus = async (req: any, res: Response):Promise<any> => {
    try{
        const {UUID} = req.body;
        const wave:any = await Wave.findOne({ where: { UUID } });
        if (wave) {
            await wave.update({status:wave.status?false:true});
        };
        return res.status(200).json({"message":"Status Updated"});
    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}

export const editUserstatus = async (req: any, res: Response):Promise<any> => {
    try{
        const {UUID} = req.body;
        const user:any = await User.findOne({ where: { UUID } });
        if (user) {
            await user.update({status:user.status?false:true});
        };
        return res.status(200).json({"message":"Status Updated"});
    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}

export const editUser = async (req: any, res: Response):Promise<any> => {
    try{

    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}




export const getAllUsers = async (req: any, res: Response):Promise<any> => {
    try{
        const { search, userType } = req.query;
        var users;
        if (userType!=1) {
            
            users = await User.findAll({where:{[Op.and]:[
                {[Op.or]:[
                    { firstname: { [Op.like]: `%${search}%` } },
                    { lastname: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                ]},
                {status: userType==2?true:false}
            ]}});
        } else {
            users = await User.findAll({where:{[Op.or]:[
                { firstname: { [Op.like]: `%${search}%` } },
                { lastname: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
            ]}});
        }
        return res.status(200).json(users);
    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}

export const getAllwaves = async (req: any, res: Response):Promise<any> => {
    try{
        const {search} = req.query;
        const waves = await Wave.findAll({
            include: [
                {
                    model: User,
                    as: 'user_wave',
                    where:{
                        [Op.or]:[
                            { firstname: { [Op.like]: `%${search}%` } },
                            { lastname: { [Op.like]: `%${search}%` } }
                        ]
                    }
                }
            ]
        });
        return res.status(200).json(waves);
    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}

export const getCounts = async (req: any, res: Response):Promise<any> => {
    try{
        const totalUsers = await User.count();
        const activeUsers = await User.count({where:{status:true}});
        const inactiveUsers = await User.count({where:{status:false}});
        const totalWaves = await Wave.count();

        res.status(200).json({"message":"Values Fetched", totalUsers, activeUsers, inactiveUsers, totalWaves});
    }
    catch(err){
        return res.status(500).json({ message: `Internal Server Error ${err}` });
    }
}