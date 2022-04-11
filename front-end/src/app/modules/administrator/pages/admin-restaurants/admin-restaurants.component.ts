import { Component, OnInit } from '@angular/core';
import { E_UserType } from "../../../shared/core/models/global/static.enums";

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.scss']
})
export class AdminRestaurantsComponent implements OnInit {

  userType = E_UserType;


  constructor() { }

  ngOnInit(): void {
  }

}
