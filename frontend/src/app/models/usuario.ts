export class usuario {
    avatar: File;
    password: string;
    fecha: Date;
    sexo: string;
    nombre: string;
    usuario: string;

    constructor(avatar:File, name: string, pass: string, date: Date, sexo: string, user: string){
        this.avatar = avatar;
        this.password = pass;
        this.fecha = date;
        this.sexo = sexo;
        this.nombre = name;
        this.usuario = user;
    }
}