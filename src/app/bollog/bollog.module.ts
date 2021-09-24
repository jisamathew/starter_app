import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BOLlogPageRoutingModule } from './bollog-routing.module';

import { BOLlogPage } from './bollog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BOLlogPageRoutingModule
  ],
  declarations: [BOLlogPage]
})
export class BOLlogPageModule {}
