import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/recent-news'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];


export const AppRoutingModule = RouterModule.forRoot(routes);
