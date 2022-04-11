import { Component, OnInit } from '@angular/core';
import { isEmpty } from "../../../shared/core/services/utils/utils.service";
import { SessionService } from "../../../shared/core/services/session/session.service";


@Component({
  selector: 'app-restaurant-dishes',
  templateUrl: './restaurant-dishes.component.html',
  styleUrls: ['./restaurant-dishes.component.scss']
})
export class RestaurantDishesComponent implements OnInit {

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

      return 'Menu items';

    } else {

      return `${ this.sessionService.onlineUser.value?.lastName } menu items`

    }

  }


  constructor(
    private sessionService: SessionService
  ) {
  }


  ngOnInit(): void {
  }

}
