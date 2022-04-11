import { Component, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { isEmpty } from "./modules/shared/core/services/utils/utils.service";
import { SessionService } from "./modules/shared/core/services/session/session.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'e-kaly';

}
