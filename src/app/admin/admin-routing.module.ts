import { Routes, RouterModule } from '@angular/router';
import { AuthActive } from '../core/auth-guard.guard';
import { JournalistApplicationsComponent } from './journalist-applications/journalist-applications.component';
import { ReviewNewsComponent } from './review-news/review-news.component';

const routes: Routes = [
    {
        path: 'journalist-applications',
        component: JournalistApplicationsComponent,
        canActivate: [AuthActive],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/login',
            authenticationRole: ['admin']
        }
    },
    {
        path: 'review-news',
        component: ReviewNewsComponent,
        canActivate: [AuthActive],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/login',
            authenticationRole: ['admin']
        }
    }
];

export const AdminRoutingModule = RouterModule.forChild(routes);