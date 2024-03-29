import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular'; 
import { Compra, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/servicios/auth-service';
@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  usuarioStorage:Usuario;
  compras:Compra[]=[];
  enviados: Compra[]=[];
  noEnviados: Compra[]=[];
  constructor(private storage: Storage,private authService: AuthService) { }

  ngOnInit() {
    this.cargarUser()
  }
  async cargarUser(){
    await this.storage.create();
    this.usuarioStorage = await this.storage.get('usuario');
    this.authService.setCurrentUser(this.usuarioStorage);
    if(this.usuarioStorage){
      console.log(this.usuarioStorage.compras[0])
    this.compras=this.usuarioStorage.compras;
    this.compras.forEach((item)=>{
if(item.enviado==true){
  this.enviados.push(item)
}else{
  this.noEnviados.push(item)
}
    })
  }else{
    this.compras = [];
    this.enviados = [];
    this.noEnviados = [];
  }
  }

}
