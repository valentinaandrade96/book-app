import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-listausuario',
  templateUrl: './listausuario.page.html',
  styleUrls: ['./listausuario.page.scss'],
})
export class ListausuarioPage implements OnInit {
  usuarios: Usuario[] = [];
  filtro: string = '';
  usuarioExpandido: string | null = null;
  public busqueda:string='';
  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.obtenerUsuarios()
  }

  async obtenerUsuarios(): Promise<void> {
    try {
      const respuesta = await this._usuarioService.obtenerTodosLosUsuarios().toPromise();
      
      if (respuesta && respuesta.usuarios) {
        // Filtra usuarios con compras no enviadas
        this.usuarios= respuesta.usuarios;
        }else{
          console.log("No hay usuarios")
        }
      }catch(error){
        console.error('Error al obtener usuarios');
      }}

      toggleDetalles(usuario: Usuario) {
        this.usuarioExpandido = this.usuarioExpandido === usuario.email ? null : usuario.email;
      }
    
      cambiarRol(email: string) {
        //********************************** */
      }
      cambiaTexto(event:any){
        this.busqueda = event.target.value;
      }
}
