import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loadingStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  hydrate(value: boolean): void {

    document.body.style.overflow = (value) ? 'hidden' : 'visible';
    this.loadingStatus.next(value);

  }

}
