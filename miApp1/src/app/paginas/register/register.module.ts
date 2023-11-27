import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ComponentesModule } from "../../componentes/componentes.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [RegisterPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RegisterPageRoutingModule,
        ComponentesModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class RegisterPageModule {}
