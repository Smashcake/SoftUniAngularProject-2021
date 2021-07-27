import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/recent-news'
    },
];


export const AppRoutingModule = RouterModule.forRoot(routes);
