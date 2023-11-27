import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { ComponentesModule } from "../../componentes/componentes.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@NgModule({
    declarations: [LoginPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ComponentesModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers:[UsuarioService]
})
export class LoginPageModule {}
