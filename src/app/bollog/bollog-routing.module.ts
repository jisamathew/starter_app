import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BOLlogPage } from './bollog.page';

const routes: Routes = [
  {
    path: '',
    component: BOLlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BOLlogPageRoutingModule {}
