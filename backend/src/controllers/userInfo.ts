import { Request, Response } from 'express';
import { User } from '../models/user';
import base64Img from 'node-base64-img';
const path = require("path");
const parentDirectory = path.join(__dirname, '../../');
const carpetaGaleria = path.join(parentDirectory, 'galeria');


export const getUser = async (req: Request, res: Response) => {
    const { username } = req.body;

    const userInfo: any = await User.findOne({  where: { username: username } });
    if(!userInfo) {
        return res.status(400).json({
            msg: `There is no user with the name ${username}`
        })
    } 
    const nombreVariable = userInfo.avatar;
    const imagePath = path.join(carpetaGaleria, nombreVariable);
    //const base64Data = base64Img.toBase64(imagePath);


    res.json({userInfo});
}
