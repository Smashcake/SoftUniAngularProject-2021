import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './not-found/not-found.component';
import { AuthActive } from './auth-guard.guard';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    AuthActive
  ]
})
export class CoreModule { }
