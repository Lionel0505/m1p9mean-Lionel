import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../modules/shared/core/services/session/session.service";
import { IconDefinition, faCartFlatbed, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { NotificationService } from "../../modules/shared/core/services/notification/notification.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faCartFlatbed: IconDefinition = faCartFlatbed;

  faRightFromBracket: IconDefinition = faRightFromBracket;


  constructor(
    public sessionService: SessionService,
    private notificationService: NotificationService
  ) {
  }


  ngOnInit(): void {

  }


  signOut(): void {

    this.sessionService.signOut().subscribe((status) => {

      if (status) this.notificationService.alert('Sign out', 'Successful!', 'success');

    });

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
