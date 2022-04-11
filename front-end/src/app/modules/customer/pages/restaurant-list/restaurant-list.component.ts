import { Component, OnInit } from '@angular/core';
import { PaginationService } from "../../../shared/core/services/pagination/pagination.service";
import { PageEvent } from "@angular/material/paginator";
import { E_UserType } from "../../../shared/core/models/global/static.enums";
import { UserService } from "../../../shared/core/services/user/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  constructor(
    public paginationService: PaginationService,
    public router: Router,
    public userService: UserService
  ) {
  }


  ngOnInit(): void {
  }


  goToMenuItems(restaurantId: string): void {

    this.router.navigate([`customer/restaurants/${restaurantId}/make-an-order`]).then();

  }


  setPage($event: PageEvent): void {

    this.userService.users.next([]);

    this.paginationService.paginationData.next({
      ...this.paginationService.paginationData.value,
      page: $event.pageIndex + 1,
      limit: $event.pageSize
    });

    this.userService.getUsers(
      {
        type: E_UserType.RES
      },
      {
        page: $event.pageIndex + 1,
        limit: $event.pageSize,
        sort: '-createdAt'
      }
    ).subscribe();

  }

}
