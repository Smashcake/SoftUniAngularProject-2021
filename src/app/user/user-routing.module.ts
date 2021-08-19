import { Routes, RouterModule } from '@angular/router';
import { AuthActive } from '../core/auth-guard.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [AuthActive],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/login',
            authenticationRole: ['user', 'journalist', 'admin']
        }
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);