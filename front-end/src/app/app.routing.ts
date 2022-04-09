import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./modules/public/pages/sign-in/sign-in.component";
import { AuthenticationGuard } from "./modules/public/core/guards/authentication/authentication.guard";
import { SignUpComponent } from "./modules/customer/pages/sign-up/sign-up.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";


const routes: Routes = [
  {
    path: 'sign_in',
    canActivate: [AuthenticationGuard],
    component: SignInComponent
  },
  {
    path: 'sign_up',
    canActivate: [AuthenticationGuard],
    component: SignUpComponent
  },
  {
    path: '',
    canActivateChild: [AuthenticationGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]

  },
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {}
