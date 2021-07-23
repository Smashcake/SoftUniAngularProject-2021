import { RouterModule, Routes } from '@angular/router';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { RecentNewsComponent } from './recent-news/recent-news.component';

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: '/recent-news'
  },
  {
      path: 'recent-news',
      component: RecentNewsComponent
  },
  {   
      path: 'news-detail/:id',
      component: NewsDetailComponent
  }
];


export const AppRoutingModule = RouterModule.forRoot(routes);
