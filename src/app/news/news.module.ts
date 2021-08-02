import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { CreateNewsComponent } from './create-news/create-news.component';
import { RecentNewsComponent } from './recent-news/recent-news.component';
import { FormsModule } from '@angular/forms';
import { NewsDetailComponent } from './news-detail/news-detail.component';



@NgModule({
  declarations: [
    CreateNewsComponent,
    RecentNewsComponent,
    NewsDetailComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule
  ]
})
export class NewsModule { }
