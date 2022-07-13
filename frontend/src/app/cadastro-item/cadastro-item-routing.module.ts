import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroItemPage } from './cadastro-item.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroItemPageRoutingModule {}
