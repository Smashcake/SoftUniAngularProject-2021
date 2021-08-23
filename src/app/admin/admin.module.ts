import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JournalistApplicationsComponent } from './journalist-applications/journalist-applications.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ReviewNewsComponent } from './review-news/review-news.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    JournalistApplicationsComponent,
    ReviewNewsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
