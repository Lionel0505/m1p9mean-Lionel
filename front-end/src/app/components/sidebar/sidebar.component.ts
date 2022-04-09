import { Component, OnInit } from '@angular/core';


declare const $: any;


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() {
  }


  ngOnInit(): void {

  }

  toggleSidebar(): void {

    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");

    if ($(".sidebar").hasClass("toggled")) {

      $('.sidebar .collapse').collapse('hide');

    }

  }

}
