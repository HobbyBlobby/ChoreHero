import { Routes } from '@angular/router';
import { GroupsComponent } from '../groups/groups.component';
import { LoginComponent } from '../login/login.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { GroupDetailsComponent } from '../group-details/group-details.component';
import { ChallengeCreateComponent } from '../challenge/challenge-create.component';
import { HeroCreateComponent } from './hero/hero-create/hero-create.component';
import { HeroComponent } from  './hero/hero.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'login/:returnTo',
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
    {
        path: 'groupDetails/:id',
        component: GroupDetailsComponent,
        title: 'Group Details'
    },
    {
        path: 'challengeCreate/:group_id',
        component: ChallengeCreateComponent,
        title: 'Create a challenge'
    },
    {
        path: 'createHero/:group_id',
        component: HeroCreateComponent,
        title: 'Create your Hero'
    },
    {
        path: 'hero/:group_id/:hero_id',
        component: HeroComponent,
        title: 'Your Hero'
    }

];
