import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/servicios/auth-service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
  usuarioStorage: Usuario;
  

  constructor(private navCtrl: NavController,private storage: Storage, private authService: AuthService) { 

  }

   ngOnInit() {
    this.userSto();
    
    
  }
  async userSto() {
    await this.storage.create();
    this.usuarioStorage = await this.storage.get('usuario');
    this.authService.setCurrentUser(this.usuarioStorage);
    console.log("this.usuarioStorage.rol userSto: "+ this.usuarioStorage.rol)
    this.esAdmin()
    console.log("this.esAdmin()"+this.esAdmin())
    
  }
  irAEditarPerfil() {
    this.navCtrl.navigateForward('/perfil');
  }
  
  irACambiarContrasena() {
    this.navCtrl.navigateForward('/cambio');
  }
  
  irACompras() {
    this.navCtrl.navigateForward('/usuario/compras');
  }
  favortios() {
    this.navCtrl.navigateForward('/favoritos');
  }
 
 envios() {
    this.navCtrl.navigateForward('/admin');
  }
 

  esAdmin(): boolean {
    return this.usuarioStorage && this.usuarioStorage.rol === 'admin';
  }
  
}
