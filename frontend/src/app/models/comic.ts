export class comic{
    id: number;
    nombre: string;
    anio_imp: number;
    sinopsis: string;
    editorial: string;

    constructor(id:number, nombre:string, anio_imp: number, sinopsis: string, editorial: string){
        this.id = id;
        this.nombre = nombre;
        this.anio_imp = anio_imp;
        this.sinopsis = sinopsis;
        this.editorial = editorial;
    }
}