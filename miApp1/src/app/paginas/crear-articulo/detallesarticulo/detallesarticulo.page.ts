import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo, Usuario } from 'src/app/interfaces/interfaces';
import { ArticulosService } from 'src/app/servicios/articulo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';



@Component({
  selector: 'app-detallesarticulo',
  templateUrl: './detallesarticulo.page.html',
  styleUrls: ['./detallesarticulo.page.scss'],
})
export class DetallesarticuloPage implements OnInit {
  
  libro: Articulo;
  usuarioStorage:Usuario;
  constructor( private activatedRoute: ActivatedRoute,
    private articulosService: ArticulosService,
    private usuarioService: UsuarioService,
    private router: Router,
    private storage: Storage
    ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('titulo')) {
        // Manejo de error si no se proporciona un artículo válido
        this.router.navigate(['/ruta/de/error']); // Redirige a una página de error o a donde sea necesario
        return;
      }
      const articuloId = paramMap.get('articuloId');
      this.usuarioService.obtenerDetallesLibro(articuloId).subscribe(
        (response) => {
          if (response.ok) {
            // Procesa los datos del libro encontrado (response.libro)
            console.log('Libro encontrado:', response.libro);
            this.libro=response.libro
          } else {
            console.log('Libro no encontrado');
          }
        },
        (error) => {
          console.error('Error al buscar el libro:', error);
        }
      );
    });
  }

  async obtenerDetallesLibro(titulo: string) {
    this.usuarioStorage = await this.storage.get('usuario');
    console.log(titulo)
    // Llama a tu servicio para obtener los detalles del libro
    this.usuarioService.obtenerDetallesLibro(titulo).subscribe(
      (response) => {
        if (response.ok) {
          // Procesa los datos del libro encontrado (response.libro)
          console.log('Libro encontrado:', response.libro);
          this.libro=response.libro
        } else {
          console.log('Libro no encontrado');
        }
      },
      (error) => {
        console.error('Error al buscar el libro:', error);
      }
    );
  }

}
