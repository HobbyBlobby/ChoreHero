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
        title: 'ChoreHeros>Login'
    },
    {
        path: 'login/:returnTo',
        component: LoginComponent,
        title: 'ChoreHeros>Login'
    },
    {
        path: 'groupList',
        component: GroupsComponent,
        title: 'ChoreHeros>Groups Page'
    },
    {
        path: 'createAccount',
        component: CreateAccountComponent,
        title: 'ChoreHeros>Create Account'
    },
    {
        path: 'groupDetails/:id',
        component: GroupDetailsComponent,
        title: 'ChoreHeros>Group Details'
    },
    {
        path: 'challengeCreate/:group_id',
        component: ChallengeCreateComponent,
        title: 'ChoreHeros>Create a challenge'
    },
    {
        path: 'createHero/:group_id',
        component: HeroCreateComponent,
        title: 'ChoreHeros>Create your Hero'
    },
    {
        path: 'hero/:group_id/:hero_id',
        component: HeroComponent,
        title: 'ChoreHeros>Your Hero'
    }

];
