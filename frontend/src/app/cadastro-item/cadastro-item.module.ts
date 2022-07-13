import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroItemPageRoutingModule } from './cadastro-item-routing.module';

import { CadastroItemPage } from './cadastro-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroItemPageRoutingModule
  ],
  declarations: [CadastroItemPage]
})
export class CadastroItemPageModule {}
