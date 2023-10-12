import { comic } from "./comic";

export class comicArr {
    status: number;
    mensaje: string;
    comics: comic[];

    constructor(status: number, sms: string, comics: comic[]){
        this.status = status;
        this.mensaje = sms;
        this.comics = comics;
    }
}