import { Component, OnInit } from '@angular/core';
import { E_UserType } from "../../../shared/core/models/global/static.enums";

@Component({
  selector: 'app-delivery-man-list',
  templateUrl: './delivery-man-list.component.html',
  styleUrls: ['./delivery-man-list.component.scss']
})
export class DeliveryManListComponent implements OnInit {

  userType = E_UserType;


  constructor() { }

  ngOnInit(): void {
  }

}
