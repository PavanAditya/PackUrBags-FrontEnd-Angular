import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./passenger/passenger.module').then(m => m.PassengerModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./passenger/passenger.module').then(m => m.PassengerModule),
  },
  {
    path: 'admin/home',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'load', component: LoadingComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
