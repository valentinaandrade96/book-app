import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RespuestaGetToken, RespuestaLogin, UserUp,ResultadoUpdate, Compras} from '../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { RespuestaUsuario, Usuario} from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { UsuarioService } from './usuario.service';


@Injectable({
    providedIn:'root'
})
export class ComprasService{
    public url: string;
 constructor(private _http:HttpClient, private _router: Router,private storage: Storage, private navCrtl: NavController, private usuarioService: UsuarioService){
 this.url=environment.urlCompras;




              
              

}

async getComprasNoEnviadas(){
            
    return this._http.get<Compras>(this.url +'obtenerNoEenviadas')
             
              

}


async getCompras(){
            
    return this._http.get<Compras>(this.url +'obtenerTodas')
             
    
}














}