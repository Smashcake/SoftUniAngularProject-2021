import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { CreateNewsComponent } from './create-news/create-news.component';
import { RecentNewsComponent } from './recent-news/recent-news.component';
import { FormsModule } from '@angular/forms';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { LocalDatePipe } from '../shared/pipes/local-date.pipe';
import { AuthActive } from '../core/auth-guard.guard';



@NgModule({
  declarations: [
    CreateNewsComponent,
    RecentNewsComponent,
    NewsDetailComponent,
    ShortenPipe,
    LocalDatePipe,
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule
  ],
  providers: [
    AuthActive
  ]
})
export class NewsModule { }
