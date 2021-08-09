import { Routes, RouterModule } from '@angular/router';
import { AuthActive } from '../core/auth-guard.guard';
import { CreateNewsComponent } from './create-news/create-news.component';
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
    },
    {
        path: 'create-news',
        component: CreateNewsComponent,
        canActivate: [AuthActive],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/login',
        }
    },   
  ];

export const NewsRoutingModule = RouterModule.forChild(routes);