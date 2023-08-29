import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login', loadChildren: () => import('./pages/login-page/login-page.module').then(m => m.LoginPageModule)},
  {path: 'home', loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
