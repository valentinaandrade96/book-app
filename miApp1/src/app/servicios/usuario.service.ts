import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RespuestaGetToken, RespuestaLogin, UserUp,ResultadoUpdate, Users, RespuestaGetUsers, ResultadoEnviado} from '../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RespuestaUsuario, Usuario} from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import * as jwtDecode from 'jwt-decode';


@Injectable({
    providedIn:'root'
})

export class UsuarioService{
    public url: string;
    public tokenAlmacenado:string;
    token: string = '';
    private usuario: Usuario;
    public aux:string;
    public apiUrl:string
    constructor(private _http:HttpClient, private _router: Router,private storage: Storage, private navCrtl: NavController){
            this.url=environment.urlUsuario;
            this.apiUrl=environment.urlArticulo;
            
            //const store = new Storage();
          
            this.storage.create();
           
              
              
        }

        async guardarToken(token: string) {
           console.log("guardar token "+ token)
            this.token = token;
          
            await this.storage.set('token', token);
         
            
            await this.validaToken();
            
          }

        login(form:any): Observable<any>{
           
            
            const login= this._http.post(this.url+'login',{email: form.email, password:form.password});
           
            return login;

        }
        getUsuario() {
            
              return this.usuario;
              
            
          }

          async setUsuario(usuar: Usuario){
            console.log("Usuario: en setUsuario 1: "+ await this.storage.get('usuario') )
            this.usuario=usuar;
            
            await this.storage.set('usuario',usuar)
            console.log("Usuario: en setUsuario 2: "+ await this.storage.get('usuario') )
        
          }

        getByMail(email:string){
            
            this._http.get<RespuestaUsuario>(this.url +'obtenerIdPorEmail/'+ email)
                      .subscribe(async resp => {
                        if(resp['ok']) {
                        
                        //await this.storage.remove('usuario');
                        this.setUsuario(resp['usuario'])
                        } else {
                          //this.navCrtl.navigateRoot('/login');
                         // resolve(false);
                        }
                      })

        }
        getUsers(){
            
          this._http.get<Users>(this.url)
                    .subscribe(async resp => {
                      if(resp['ok']) {
                      
                      //await this.storage.remove('usuario');
                      //this.setUsuario(resp['usuario'])
                      } else {
                        //this.navCrtl.navigateRoot('/login');
                       // resolve(false);
                      }
                    })

      }

      obtenerDetallesLibro(titulo: string): Observable<any> {
        // Realiza una solicitud GET para buscar un libro por título
        return this._http.get(this.apiUrl+'getLibroPorTitulo?titulo='+titulo);
      }

        create(form:any): Observable<any>{
           
    
            return this._http.post(this.url+'create',{
            nombre   : form.nombre,
            apellidos   : form.apellidos,
            email    : form.email,
            password : form.password,
            nacimiento   : form.nacimiento,
            sexo   : form.sexo,
            direccion   : form.direccion,
            ciudad   : form.ciudad,
            localidad   : form.localidad,
            pais   : form.pais,
            cp:form.cp,
            rol:form.rol
            /*
            compras:'{}',
            rol:'usuario',
            carrito:'{}',
            favoritos:'{}',
            */
            });

        }

         marcarComoEnviado(email: string): Promise<Observable<ResultadoEnviado>>{
          const body = {
            email: email,
            
          };
          console.log("Usuario_service")
          console.log(this.url+ 'setEnviado')
          console.log(this.url)
          console.log(email)
          const response = this._http.post<ResultadoEnviado>(this.url+ 'setEnviado', body);
          return Promise.resolve(response);
         
        }

     


        logout():void {
            localStorage.removeItem("token");
            this._router.navigate['/first']
        }
        
        async getToken(){
            return  await this.storage.get('token')
        }

        async cargarToken(){
            this.tokenAlmacenado= await this.storage.get('token') || null;
        }

        setSession(authResult: RespuestaGetToken){
            console.log("Entroaqui")
            localStorage.setItem('Token', authResult.token);
            //this.usuario = jwtDecode(authResult.token);
        }
        setToken(authResult: ResultadoUpdate){
            
            localStorage.setItem('Token', authResult.token);
            //this.usuario = jwtDecode(authResult.token);
        }
        setTokenByString(token: string){
            
          localStorage.setItem('Token', token);
          //this.usuario = jwtDecode(authResult.token);
      }


        
        async renewToken():Promise<boolean>{
            this.cargarToken();
            if(!this.tokenAlmacenado){
                this.logout();
                
                this._router.navigate['/first']; 
                return Promise.resolve(false);

            }
        }

        async validaToken(): Promise<boolean> {

            await this.cargarToken();
        
            if(this.token === '') {
              this.navCrtl.navigateRoot('/login');
              return Promise.resolve(false);
            }
        
            return new Promise<boolean>(resolve => {
              const headers = new HttpHeaders({
                'x-token': this.token
              });
              
             
              this._http.get<RespuestaUsuario>(this.url +'get', { headers })
                      .subscribe(resp => {
                        if(resp['ok']) {

                          resolve(true);
                        } else {
                          this.navCrtl.navigateRoot('/login');
                          resolve(false);
                        }
                      })
                      
            });
          }

          
/*
          async obtenerTodosLosUsuarios(): Promise<Observable<RespuestaGetUsers>> {
            const response = this._http.get<RespuestaGetUsers>(this.url+"/obtenerTodosLosusuarios");

            return Promise.resolve(response);
          }
*/
obtenerTodosLosUsuarios(): Observable<RespuestaGetUsers> {
  return this._http.get<RespuestaGetUsers>(this.url + "obtenerTodosLosusuarios");
}

          
          async update( user:Usuario): Promise<Observable<ResultadoUpdate>>{
           
            const headers = new HttpHeaders({
              'x-token': await this.storage.get('token') || null
            });
            
            
           const response = this._http.post<ResultadoUpdate>(this.url + 'update', user, { headers });
            return Promise.resolve(response);
            
          }
            
        
          

          async cambiarContraseña( email:string,contrasenaActual:string,nuevaContrasena: string  ): Promise<Observable<RespuestaLogin>>{
            const body = {
              email: email,
              contrasenaActual: contrasenaActual,
              nuevaContrasena: nuevaContrasena
            };
            
            
           const response = this._http.post<RespuestaLogin>(this.url + 'cambiarContrasena', body );
            return Promise.resolve(response);
            
          }
            
        
          }

       
      /*  
          actualizarUsuario(usuario: Usuario) {
            const headers = new HttpHeaders({
              'x-token': this.token
            });
        
            return new Promise(resolve => {
              this.http.post<RespuestaLogin>(`${url}/usuario/update`, usuario, { headers })
                        .subscribe(resp => {
                          if(resp['ok']) {
                            this.guardarToken(resp['token']);
                            resolve(true);
                          } else {
                            resolve(false);
                          }
                        })
            })
        
          }
        */

