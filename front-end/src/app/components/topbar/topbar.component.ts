import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../modules/shared/core/services/session/session.service";
import { NotificationService } from "../../modules/shared/core/services/notification/notification.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
    public sessionService: SessionService,
    private notificationService: NotificationService
  ) {
  }


  ngOnInit(): void {
  }


  toggleSidebar(): void {

    document.querySelector('body')!.classList.toggle("sidebar-toggled");

    const sidebar = document.querySelector('.sidebar');

    sidebar!.classList.toggle("toggled");

    if (sidebar!.classList.contains("toggled")) {

      document.querySelector('.sidebar')!.classList.toggle('hidden');

    }

  }

}
