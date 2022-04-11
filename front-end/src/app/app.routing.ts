import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from "./modules/public/pages/sign-in/sign-in.component";
import { SignUpComponent } from "./modules/customer/pages/sign-up/sign-up.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { PageNotFoundComponent } from "./modules/public/pages/page-not-found/page-not-found.component";
import { DataStorageResolver } from "./modules/shared/core/resolvers/data-storage/data-storage.resolver";
import { RedirectGuard } from "./modules/shared/core/guards/redirect/redirect.guard";
import { AuthenticationGuard } from "./modules/public/core/guards/authentication/authentication.guard";


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
    resolve: { data: DataStorageResolver },
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ],
    canActivateChild: [AuthenticationGuard]

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting {
}
