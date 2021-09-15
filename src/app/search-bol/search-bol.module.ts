import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchBolPageRoutingModule } from './search-bol-routing.module';

import { SearchBolPage } from './search-bol.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBolPageRoutingModule
  ],
  declarations: [SearchBolPage]
})
export class SearchBolPageModule {}
