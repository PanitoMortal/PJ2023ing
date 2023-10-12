import { usuario } from "./usuario";

export class login {
    status: number;
    mensaje: string;
    usuario: usuario;

    constructor(status: number, sms: string, user: usuario){
        this.status = status;
        this.mensaje = sms;
        this.usuario = user;
    }
}