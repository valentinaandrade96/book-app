import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambioPageRoutingModule } from './cambio-routing.module';

import { CambioPage } from './cambio.page';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { UsuarioService } from 'src/app/servicios/usuario.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambioPageRoutingModule,
    ComponentesModule
  ],
  declarations: [CambioPage],
  providers:[UsuarioService]
})
export class CambioPageModule {}
