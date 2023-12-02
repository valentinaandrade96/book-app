import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {
 


  constructor(private navCtrl: NavController) { }

  ngOnInit() {
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
  /*

  esAdmin(): boolean {
    //return this.usuarioStorage && this.usuarioStorage.rol === 'admin';
  }
  */
}
