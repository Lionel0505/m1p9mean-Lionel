import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from "@angular/router";
import { TopbarComponent } from './topbar/topbar.component';


@NgModule({
  declarations: [
    FooterComponent,
    SidebarComponent,
    TopbarComponent
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule {}
