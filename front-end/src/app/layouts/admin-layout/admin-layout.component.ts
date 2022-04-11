import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../modules/shared/core/services/session/session.service";
import { Router } from "@angular/router";
import { isEmpty } from "../../modules/shared/core/services/utils/utils.service";
import { LoaderService } from "../../modules/shared/core/services/loader/loader.service";


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    public loaderService: LoaderService
  ) {

  }


  ngOnInit(): void {

  }

}
