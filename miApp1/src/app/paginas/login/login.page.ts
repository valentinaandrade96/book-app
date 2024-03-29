import { Component, OnInit } from '@angular/core';
import { Componente } from '../../interfaces/componente';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth-service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { RespuestaGetToken } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form: FormGroup;

  login:boolean = true;

  passwordIcon = 'eye-off';
  passwordType = 'password';
  public pass: string ;
  public name: string ;
  public user={
    name:"",
    password:""
  }
  public mail:string;
  isAdmin=false;
  constructor(private authService: AuthService, private _usuarioService:UsuarioService , private _toastController: ToastController,private navCtrl: NavController,private formBuilder: FormBuilder, 
    
    private router: Router,private auth:AuthService
    ) {
      this.form = new FormGroup({
        
        email: new FormControl('', [Validators.required, Validators.email]),
        
        password: new FormControl('', Validators.required),
       
      })
     }

  ngOnInit() {
  }

  submitInfo(usuario){
    this.navCtrl.navigateForward(['/libros'], {
      queryParams: {
        name: usuario.name
      }
  });

  }


passwordOn() {
  this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
}


onLogin(){
  if(this.form.valid){
  const username = this.form.controls.email.value;
  const pwd = this.form.controls.password.value;
console.log(username+""+pwd)
  this._usuarioService.login({
    email:username,
    password: pwd
  }
  ).subscribe(async (response: RespuestaGetToken)=>{
    console.log('response', response);
    if(response.status=='fail'){
    console.log('error de inicio de sesión');
    alert("Usuario o contraseña incorrecta");
      
     
    }else{
      
      if (response.token) {
       
        //this._usuarioService.setSession(response);
        console.log("response.token+ "+ response.token)
        
        this._usuarioService.guardarToken( response.token )
        this.authService.setCurrentUser(response.usuarioDB);
        this._usuarioService.setUsuario(response['usuarioDB'])
        console.log("response['usuarioDB']"+ response['usuarioDB'])
        console.log("response.usuarioDB" + response.usuarioDB)
        console.log(response)
        console.log(response.usuarioDB.rol)
        console.log(typeof response.usuarioDB)
        if(response.usuarioDB.rol=='admin'){
          console.log("response.usuarioDB.rol es  : response.usuarioDB.rol=='admin'"+ response.usuarioDB.rol)
          this.router.navigateByUrl('/libros');
        }else{
          this.router.navigateByUrl('/libros');
          console.log("response.usuarioDB.rol es : "+ response.usuarioDB.rol)
        }
      }
      this._usuarioService.setSession(response);
      //this.modal.dissmis(null,'cancel');
      
      console.log('El login es correcto')
    }



  })}else{
    
  }
}
back(){
  this.router.navigateByUrl('/first');
}
}
/*
  this.auth.onLoginUser(username, pwd).subscribe({
    next: res => {
      console.log(res);
      localStorage.setItem('token', res.token); 
      this.router.navigate(['/infinite-scroll'], {replaceUrl:true}); 
    },
    error: err => {console.error(err);
    }
  })
  */
