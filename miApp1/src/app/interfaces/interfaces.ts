


  export interface Usuario {
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    nacimiento: Date,
    sexo: string,
    direccion: string,
    ciudad: string,
    localidad: string,
    pais: string,
    cp:string,
    favoritos: [{
      titulo:string,
      img:string,
      ISBN:string,
      precioTotal:number,
      
      enviado:boolean
    }],
    rol:string
    carrito:[{
      titulo:string,
      img:string,
      ISBN:string,
      precioTotal:number,
      
      enviado:boolean
    }],
    compras: [{
        titulo:string,
        img:string,
        ISBN:string,
        precioTotal:number,
        
        enviado:boolean
    }],

    
}
export interface UserUp  {
    
    nombre?: string,
    email?: string,
    apellidos?: string,
    password?: string,
    nacimiento?: Date,
    sexo?: string,
    direccion?: string,
    ciudad?: string,
    localidad?: string,
    pais?: string,
    cp?:string

    


    
}



export interface Articulo  {
  ISBN: string;
    titulo: string;
    precio_compra: Number;
    precio_venta: Number;
    categoria: string;
    descripcion: string;
    autor: string;
    proveedor: string;
    telefonoProveedor: string;
    img: string;
    stock:number;
    
}

export interface Compra {
  titulo:string,
  img:string,
  ISBN:string,
  precioTotal:number,
  enviado:boolean
}
export interface Users {
  ok: boolean,
  usuarios: Usuario[],
 
}

  
export interface RespuestaUsuario {
    ok: boolean;
    usuarioDb: Usuario;
  }

  export interface Compras {
    ok: boolean;
    compras: ICompra[];
  }

  export interface RespuestaGetUsers {
    filter(arg0: (usuario: any) => any): Usuario[]
    ok: boolean;
    usuarios: Usuario[];
  }

  export interface ICompra {
    fechaCompra: Date,
    email:string
    articulo:string[],
    enviado:boolean,
    precioTotal:Number,
    nombreUsuario: string,
    direccion: string,
    ciudad:string,
    localidad:string,
    pais:string,
    cp:string,
    
    
   

   
}


  export class RespuestaGetToken{
    constructor(
        public status:string,
        public message:string,
        public usuarioDB:Usuario,
        public token?:string

        ){
            
        }
}
export class RespuestaGetTokenR{
  constructor(
      public status:string,
      public message:string,
      public usuarioDb:Usuario,
      public token?:string

      ){
          
      }
}

export interface RespuestaUsuario {
    ok: boolean;
    Usuario: Usuario;
  }

  export interface RespuestaLogin {
    ok: boolean;
    token: string;
    usuario:Usuario
  }

  export interface ResultadoUpdate{
    ok: boolean;
    token: string;
    userDB:Usuario
  }

 
  
  export interface ResultadoEnviado{
    ok: boolean;
    mensaje: string;
    usuario:Usuario
  }

  export interface RespuestaGetArticulos{
    status: string;
    message: string;
    articulos:Articulo[]
  }

  export interface RespuestaUpdateArtticulo{
    ok: boolean;
    mensaje: string;
    libro:Articulo
  }