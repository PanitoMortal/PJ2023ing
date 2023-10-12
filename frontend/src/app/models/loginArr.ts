import { usuario } from "./usuario";

export class loginArr {
    status: number;
    mensaje: string;
    usuarios: usuario[];

    constructor(status: number, sms: string, user: usuario[]){
        this.status = status;
        this.mensaje = sms;
        this.usuarios = user;
    }
}