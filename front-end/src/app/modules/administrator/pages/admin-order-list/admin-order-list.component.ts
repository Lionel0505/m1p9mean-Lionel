import { Component, OnInit } from '@angular/core';
import { E_UserType } from "../../../shared/core/models/global/static.enums";

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent implements OnInit {

  userType = E_UserType;

  constructor() { }

  ngOnInit(): void {
  }

}
