import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsRoutingModule } from './news-routing.module';
import { CreateNewsComponent } from './create-news/create-news.component';
import { RecentNewsComponent } from './recent-news/recent-news.component';
import { FormsModule } from '@angular/forms';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { AuthActive } from '../core/auth-guard.guard';
import { SharedModule } from '../shared/shared.module';
import { NewsPaginationComponent } from './news-pagination/news-pagination.component';




@NgModule({
  declarations: [
    CreateNewsComponent,
    RecentNewsComponent,
    NewsDetailComponent,
    NewsPaginationComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    AuthActive
  ]
})
export class NewsModule { }
