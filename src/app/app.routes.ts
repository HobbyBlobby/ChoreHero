import { Routes } from '@angular/router';
import { GroupsComponent } from '../groups/groups.component';
import { LoginComponent } from '../login/login.component';
import { CreateAccountComponent } from '../create-account/create-account.component'

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'groupList',
        component: GroupsComponent,
        title: 'Groups Page'
    },
    {
        path: 'createAccount',
        component: CreateAccountComponent,
        title: 'Create Account'
    },
];
