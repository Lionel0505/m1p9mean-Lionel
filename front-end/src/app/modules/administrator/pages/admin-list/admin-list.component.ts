import { Component, OnInit } from '@angular/core';
import { E_UserType } from "../../../shared/core/models/global/static.enums";


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  userType = E_UserType;


  constructor() {
  }


  ngOnInit(): void {
  }

}
