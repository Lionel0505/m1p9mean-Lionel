import { Component, OnInit } from '@angular/core';
import { E_UserType } from "../../../shared/core/models/global/static.enums";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  userType = E_UserType;


  constructor() { }

  ngOnInit(): void {
  }

}
