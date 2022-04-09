import { Injectable } from '@angular/core';
import sweetalert2, { SweetAlertIcon } from 'sweetalert2';
import { isEmpty } from "../utils/utils.service";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
  }


  simpleAlert(title: string) {

    sweetalert2
      .fire(title)
      .then();

  }


  alert(title: string, text?: string, icon?: string) {

    sweetalert2
      .fire(
        title,
        text, // text or html
        !isEmpty(icon) ? icon as SweetAlertIcon : undefined
      )
      .then();

  }


  confirmBox(
    // title
    title: string,
    confirmTitle: string,
    cancelTitle: string,
    // button text
    confirmButtonText: string,
    cancelButtonText: string,
    // first alert content
    text?: string,
    icon?: string,
    // confirm alert content
    confirmText?: string,
    confirmIcon?: string,
    // cancel alert content
    cancelText?: string,
    cancelIcon?: string,
  ) {

    const sweetalert2Options: any = {
      title: title,
      text: text,
      icon: !isEmpty(icon) ? icon as SweetAlertIcon : undefined,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    }

    sweetalert2
      .fire(sweetalert2Options)
      .then((result) => {

        if (result.value) {

          this.alert(confirmTitle, confirmText, confirmIcon);

        } else if (result.dismiss === sweetalert2.DismissReason.cancel) {

          this.alert(cancelTitle, cancelText, cancelIcon);

        }

      });

  }

}
