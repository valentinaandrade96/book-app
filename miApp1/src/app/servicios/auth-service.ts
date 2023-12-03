import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Usuario } from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService{
  
  
    
    constructor(private http:HttpClient) { 
      
    }
    
    private url = 'http://localhost:3300';
    
    onLoginUser(user:string, pwd:string):Observable<any>{
  
      console.log('user:', user, ' pwd:', pwd);
      
      const url = `${this.url}/user/login`;
  
      return this.http.post(url, {
        user: user,
        pwd: pwd
      })
    }
    private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  // Método para actualizar el usuario actual
  setCurrentUser(user: Usuario): void {
    this.currentUserSubject.next(user);
  }
  
    onRegister(user:string, pwd:string, email:string, age:string):Observable<any>{
  
      console.log('user:', user, ' pwd:', pwd);
      
      const url = `${this.url}/user/newUser`;
  
      return this.http.post(url, {
        user: user,
        pwd: pwd,
        email:email,
        age:age
      })
  
    }
  
    loggedIn():boolean{ //Comprueba si el token existe o no
      return !!localStorage.getItem('token');
    }
  
    getToken(){ //Devuelve el token
  
      return localStorage.getItem('token');
    }
  
    onLogOut(){
      localStorage.removeItem('token');
    }
  
  
  }
  