import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
  },
  { path: 'load', component: LoadingComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
