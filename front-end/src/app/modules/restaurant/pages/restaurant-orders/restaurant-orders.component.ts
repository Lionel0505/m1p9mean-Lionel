import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../../shared/core/services/session/session.service";
import { isEmpty } from "../../../shared/core/services/utils/utils.service";
import { E_UserType } from "../../../shared/core/models/global/static.enums";


@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.scss']
})
export class RestaurantOrdersComponent implements OnInit {

  userType = E_UserType;

  get query(): any {

    if (isEmpty(this.sessionService.onlineUser.value)) {

      return {};

    } else {

      return {

        restaurant: this.sessionService.onlineUser.value?._id

      }

    }

  }

  get title(): any {

    if (isEmpty(this.sessionService.onlineUser.value)) {

      return 'Orders';

    } else {

      return `${this.sessionService.onlineUser.value?.lastName} orders`

    }

  }


  constructor(
    private sessionService: SessionService
  ) {
  }


  ngOnInit(): void {
  }

}
