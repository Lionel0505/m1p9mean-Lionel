import { Component, Input, OnInit } from '@angular/core';
import { UserService } from "../../../core/services/user/user.service";
import { PageEvent } from "@angular/material/paginator";
import { PaginationService } from "../../../core/services/pagination/pagination.service";
import { isEmpty } from "../../../core/services/utils/utils.service";
import { E_UserType } from "../../../core/models/global/static.enums";
import { IconDefinition, faPenToSquare, faTrashCan, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { MatDialog } from "@angular/material/dialog";
import { UserModalComponent } from "../../modals/user-modal/user-modal.component";
import { IUser } from "../../../core/models/schemas/user.schema";
import { LoaderService } from "../../../core/services/loader/loader.service";


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  @Input('title') title: string = '';

  @Input('userType') userType: string = '';

  faPenToSquare: IconDefinition = faPenToSquare;

  faTrashCan: IconDefinition = faTrashCan;

  faCirclePlus: IconDefinition = faCirclePlus;


  get isRestaurant(): boolean {

    if (isEmpty(this.userType)) {

      return false;

    } else {

      return this.userType == E_UserType.RES;

    }

  }


  get isCustomer(): boolean {

    if (isEmpty(this.userType)) {

      return false;

    } else {

      return this.userType == E_UserType.CUS;

    }

  }


  constructor(
    public userService: UserService,
    public paginationService: PaginationService,
    public loaderService: LoaderService,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
  }


  createNewUser(): void {

    const dialogRef = this.dialog.open(UserModalComponent, {
      minWidth: '35%',
      data: { title: `Create new ${this.userType}`, userType: this.userType }
    });

    dialogRef.beforeClosed().subscribe((result) => {

      this.loaderService.hydrate(true);

      if (!isEmpty(result)) {

        this.userService.createUser(result.data).subscribe(() => {

          this.loaderService.hydrate(false);

        });

      } else {

        this.loaderService.hydrate(false);

      }

    });

  }


  updateUser(user: IUser): void {

    const dialogRef = this.dialog.open(UserModalComponent, {
      minWidth: '35%',
      data: { title: `Update ${this.userType}`, userType: this.userType, user: user }
    });

    dialogRef.beforeClosed().subscribe((result) => {

      this.loaderService.hydrate(true);

      if (!isEmpty(result)) {

        this.userService.updateUser(result.userId, result.data).subscribe(() => {

          this.loaderService.hydrate(false);

        });

      } else {

        this.loaderService.hydrate(false);

      }

    });

  }


  setPage($event: PageEvent): void {

    this.loaderService.hydrate(true);

    this.userService.users.next([]);

    this.paginationService.paginationData.next({
      ...this.paginationService.paginationData.value,
      page: $event.pageIndex + 1,
      limit: $event.pageSize
    });

    this.userService.getUsers(
      {
        type: this.userType
      },
      {
        page: $event.pageIndex + 1,
        limit: $event.pageSize,
        sort: '-createdAt'
      }
    ).subscribe(() => {

      this.loaderService.hydrate(false);

    });

  }

}
