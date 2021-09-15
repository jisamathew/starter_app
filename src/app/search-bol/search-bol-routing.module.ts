import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBolPage } from './search-bol.page';

const routes: Routes = [
  {
    path: '',
    component: SearchBolPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBolPageRoutingModule {}
