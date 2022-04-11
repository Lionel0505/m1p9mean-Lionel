import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { IPaginationData } from "../../models/global/pagination.type";
import { isEmpty } from "../utils/utils.service";


@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  paginationData: BehaviorSubject<IPaginationData> = new BehaviorSubject<IPaginationData>({
    page: 1,
    limit: 1,
    totalItems: 1
  });


  constructor() {
  }


  setPaginationData(meta: any): void {

    if (isEmpty(meta)) {

      meta.page = 1;
      meta.itemsPerPage = 1;
      meta.totalItems = 1;

    } else {

      if (meta.page <= 0) {

        meta.page = 1;

      }

      if (meta.itemsPerPage <= 0) {

        meta.itemsPerPage = 1;

      }

      if (meta.totalItems <= 0) {

        meta.totalItems = 1;

      }

    }

    const paginationInfos: IPaginationData = {
      limit: meta.itemsPerPage,
      page: meta.page,
      totalItems: meta.totalItems
    }

    this.paginationData.next({...paginationInfos});

  }


}
