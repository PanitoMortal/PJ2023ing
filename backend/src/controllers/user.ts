import { Request, Response } from 'express' 
import bcrypt from 'bcrypt';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import  Multer  from "multer";


export const newUser = async (req: Request, res: Response) => {
    console.log(req.body);

    const { username } = req.body;


    //VALIDACION SI UN USUARIO YA ESTA EN LA BASE DE DATOS
    const user = await User.findOne({  where: { username: username } })
    if(user) {
        return res.status(400).json({
            msg: `A user with the username ${username} already exists`
        })
    }

    
    const path = require('path');
    var filenameTimestamp: any;
    const storage = Multer.diskStorage({
        destination: path.join(__dirname, '../../galeria'),
        filename: (req, file, cb): void => {
            filenameTimestamp = Date.now();
            cb(null, `${filenameTimestamp}-${file.originalname}`);
        },
    });

    const upload = Multer({ storage: storage })

    exports.upload = upload.single('image');
 
    exports.uploadFile = async (req: any, res: any) => {
        try{
            const avatar = `${filenameTimestamp}-${req.file.originalname}`;
            console.log("Contenido de avatar" + avatar);
            const { name, password, date, gender, username } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
                //GUARDAR USUARIO
            try {
                await User.create({
                    avatar: avatar,
                    name: name,
                    password: hashedPassword,
                    date: date,
                    gender: gender,
                    username: username    
                })
            
                res.json({
                    msg: `User ${username} created successfully!`
                })
            } catch (error) {
                console.log("Primer error" + error);
                res.status(400).json({
                    msg: 'Ocurrio un error',
                    error
                })
            }
        } catch(error) {
            console.log("Segundo error" + error);
            res.status(400).json({
                msg: 'Failed to load image',
                error
            })
        }
    }
}



export const loginUser = async (req: Request, res: Response) => {
    console.log(req.body);

    const { username, password } = req.body;

    //Validamos si el usuario existe en la base de datos
    const user: any = await User.findOne({  where: { username: username } });

    if(!user) {
        return res.status(400).json({
            msg: `There is no user with the name ${username}`
        })
    }

    //Validamos password
    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValid) {
        
        return res.status(400).json({
            msg: `Incorrect Password`
        })
    }

    //Generamos token
    const token = jwt.sign({
        username: username
    }, process.env.SECRET_KEY || 'castillo123');

    res.json(token);
}
