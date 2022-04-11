import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition, faPenToSquare, faTrashCan, faCirclePlus, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { isEmpty } from "../../../core/services/utils/utils.service";
import { PaginationService } from "../../../core/services/pagination/pagination.service";
import { LoaderService } from "../../../core/services/loader/loader.service";
import { MatDialog } from "@angular/material/dialog";
import { UserModalComponent } from "../../modals/user-modal/user-modal.component";
import { PageEvent } from "@angular/material/paginator";
import { DishService } from "../../../core/services/dish/dish.service";
import { DishModalComponent } from "../../modals/dish-modal/dish-modal.component";
import { IDish } from "../../../core/models/schemas/dish.schema";


@Component({
  selector: 'app-dishes-table',
  templateUrl: './dishes-table.component.html',
  styleUrls: ['./dishes-table.component.scss']
})
export class DishesTableComponent implements OnInit {

  @Input('title') title: string = '';

  @Input('query') query: any = {};

  faPenToSquare: IconDefinition = faPenToSquare;

  faTrashCan: IconDefinition = faTrashCan;

  faCirclePlus: IconDefinition = faCirclePlus;

  faEye: IconDefinition = faEye;

  faEyeSlash: IconDefinition = faEyeSlash;


  constructor(
    public dishService: DishService,
    public paginationService: PaginationService,
    public loaderService: LoaderService,
    private dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
  }


  createNewDish(): void {

    const dialogRef = this.dialog.open(DishModalComponent, {
      minWidth: '50%',
      data: {title: `Create new dish`}
    });

    dialogRef.beforeClosed().subscribe((result) => {

      this.loaderService.hydrate(true);

      if (!isEmpty(result)) {

        console.log(result.data);

        this.dishService.createDish(result.data).subscribe(() => {

          this.loaderService.hydrate(false);

        });

      } else {

        this.loaderService.hydrate(false);

      }

    });

  }


  updateDish(dish: IDish): void {

    const dialogRef = this.dialog.open(DishModalComponent, {
      minWidth: '50%',
      data: {title: `Update dish`, dish: dish}
    });

    dialogRef.beforeClosed().subscribe((result) => {

      this.loaderService.hydrate(true);

      if (!isEmpty(result)) {

        this.dishService.updateDish(result.dishId, result.data).subscribe(() => {

          this.loaderService.hydrate(false);

        });

      } else {

        this.loaderService.hydrate(false);

      }

    });

  }


  setPage($event: PageEvent): void {

    this.loaderService.hydrate(true);

    this.dishService.dishes.next([]);

    this.paginationService.paginationData.next({
      ...this.paginationService.paginationData.value,
      page: $event.pageIndex + 1,
      limit: $event.pageSize
    });

    this.dishService.getDishes(
      {
        ...this.query
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
