import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    IonicStorageModule.forRoot(),
    ComponentesModule
  ],
  declarations: [PerfilPage],
  providers:[UsuarioService]
})
export class PerfilPageModule {}
