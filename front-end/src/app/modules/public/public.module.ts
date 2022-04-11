import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BlankPageComponent } from './pages/blank-page/blank-page.component';



@NgModule({
    declarations: [
        SignInComponent,
        PageNotFoundComponent,
        BlankPageComponent
    ],
    exports: [
        PageNotFoundComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class PublicModule { }
