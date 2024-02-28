import { Routes } from '@angular/router';
import { GroupsComponent } from '../groups/groups.component';
import { LoginComponent } from '../login/login.component';

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
    }
];
