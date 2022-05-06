export class Usuario {
    mail?:string; //defino la variable y el tipo
    pwd?:string;
    nombre?:string;

    constructor(){   
    }

    registrar(): void {
        let usuarios:any = [];

        if(localStorage.getItem('usuarios') !== '') //valido que el array usuarios exista
        {
            usuarios = localStorage.getItem('usuarios'); //obtengo el array que existe
            //usuarios = JSON.parse(localStorage.getItem('usuarios')); //obtengo el array que existe
        }
        else
        {
            usuarios = []; //creo el array
        }
        usuarios.push({nombre: this.nombre, mail: this.mail, pwd: this.pwd}); //agrego el objeto al array
        localStorage.setItem("usuarios", JSON.stringify(usuarios)); //guardo el array actualizado
    }

}