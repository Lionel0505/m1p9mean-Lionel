import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;

  @Input('length') length: number = 100;

  @Input('pageSize') pageSize: number = 5; // LIMIT
  @Input('pageSizeOptions') pageSizeOptions: number[] = [5, 10];

  @Input('pageIndex') pageIndex: number = 1; //

  // MatPaginator Output
  @Output('page') page: EventEmitter<PageEvent> = new EventEmitter();


  constructor() {
  }


  ngOnInit(): void {

  }


  setPage(event: PageEvent) {

    this.page.emit(event);

  }


  ngAfterViewInit() {
  }


  ngAfterContentInit() {

    if (this.paginator) {

      this.paginator.pageIndex = 0;

    }

  }

}
