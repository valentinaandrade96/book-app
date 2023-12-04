import { Component, OnInit } from '@angular/core';

import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth-service';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { RespuestaGetToken } from 'src/app/interfaces/interfaces';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    
  public form: FormGroup;

  login:boolean = true;

  passwordIcon = 'eye-off';
  passwordType = 'password';

  constructor(private formBuilder: FormBuilder, 
    private _usuarioService:UsuarioService ,
    private navCtrl: NavController,
    private router: Router,
    private auth:AuthService,
    private _toastController: ToastController,private authService: AuthService) { 

    this.form = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      nacimiento: new FormControl('',Validators.required),
      sexo: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      ciudad: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      pais: new FormControl('', Validators.required),
      cp: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordtwo: new FormControl('')
    })
  }

  ngOnInit() {
  }
  
 
  public pass: string ;
  public name: string ;
  public user={
    name:"",
    password:""
  }
  passwordOn() {
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  submitInfo(usuario){
    this.navCtrl.navigateForward(['/libros'], {
      queryParams: {
        name: usuario.name
      }
  });

  }
  segmentChanged(event:any){
    const chose = event.detail.value;

    this.login = chose === 'login';
  }

  checkPassword(){
    const pwd = this.form.controls.pwd.value;
    const confirmPwd = this.form.controls.rpwd.value;

    return pwd === confirmPwd ? true : false;
  }

  onLogin(){
    const username = this.form.controls.username.value;
    const pwd = this.form.controls.pwd.value;
    

    this.auth.onLoginUser(username, pwd).subscribe({
      next: res => {
        console.log(res);
        localStorage.setItem('token', res.token); 
        this.router.navigate(['/libros'], {replaceUrl:true}); 
      },
      error: err => {console.error(err);
      }
    })
  }




  onRegister(){

    if(this.form.valid){
      if(this.form.controls.password.value== this.form.controls.passwordtwo.value){
      const nombre = this.form.controls.nombre.value;
      const password = this.form.controls.password.value;
      const email = this.form.controls.email.value;
      const sexo = this.form.controls.sexo.value;
      const direccion = this.form.controls.direccion.value;
      const localidad = this.form.controls.localidad.value;
      const apellidos = this.form.controls.apellidos.value;
      const nacimiento= this.form.controls.nacimiento.value;
      const pais= this.form.controls.pais.value;
      const ciudad= this.form.controls.ciudad.value;
      const cp= this.form.controls.cp.value;
      const rol='usuario'
      
  console.log(nombre)
      this._usuarioService.create({
        nombre:nombre,
        apellidos:apellidos,
        email:email,
        password:password,
        nacimiento: nacimiento,
        sexo: sexo,
        direccion: direccion,
        ciudad:ciudad,
        localidad: localidad,
        pais:pais,
        rol:rol,
        cp: cp

      }).subscribe(async (response: RespuestaGetToken)=>{
        console.log('response', response);
        console.log('response.message'+ response.message);
        console.log('response.message'+ response['message']);
        if(response.status=='fail'){
        console.log('error al crear el usuario');
         alert('Este correo ya ha sido registrado anteriormente')
        }else{

          this._usuarioService.guardarToken( response.token )
          this.authService.setCurrentUser(response['usuarioDb']);
        this._usuarioService.setUsuario(response['usuarioDb'])
            // Guarda el token en localStorage
           // this._usuarioService.setSession(response);
            this._usuarioService.setUsuario(response.usuarioDB)
            console.log("response['usuarioDB']"+response['usuarioDb'])
            console.log("response.usuarioDB"+response.usuarioDB)
          
          //this.modal.dissmis(null,'cancel');
          this.router.navigateByUrl('/libros');
          console.log('El usuario se ha creado correctamente')
        }
    
    
    
      })}else{
        alert("Las contraseñas no coinciden")
      }
    }else{
      console.log('Los datos del formulario no son válidos')
      alert("Los datos no son válidos")
    }
  }
  back(){
    this.router.navigateByUrl('/first');
  }
    
  
}
