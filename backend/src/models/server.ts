import express, { Application } from 'express';
import cors from 'cors';
import routesUser from '../routes/user';
import { User } from './user';
import routerRecipes from '../routes/recipe';

const path = require("path");
const parentDirectory = path.join(__dirname, '../../');

export class Server {
    private app: Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.app.use('/galeria', express.static(path.join(parentDirectory, 'galeria')));
        this.app.listen(this.port, () => {
            console.log('Listening on port '+ this.port);
        })
    }

    routes() {
        this.app.use('/menu', routerRecipes)
        this.app.use('/users', routesUser);
    }

    midlewares() {
        this.app.use(express.json());

        this.app.use(cors());

        
    }

    async dbConnect() {
        try {
            await User.sync();
        } catch(error) {
            console.error('Unable to connect to the database: ', error);
        }
    }

}

export default Server;