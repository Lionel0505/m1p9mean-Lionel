import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { isEmpty } from "../../../core/services/utils/utils.service";
import { NotificationService } from "../../../core/services/notification/notification.service";
import { E_UserType } from "../../../core/models/global/static.enums";


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  userForm: FormGroup;


  get isRestaurant(): boolean {

    if (isEmpty(this.data.userType)) {

      return false;

    } else {

      return this.data.userType == E_UserType.RES;

    }

  }


  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (isEmpty(data) || isEmpty(data.userType) || isEmpty(data.title)) {

      this.notificationService.alert('Data not found', `Missing data.`);
      this.close();

    }

    if (isEmpty(data.user)) {

      this.userForm = formBuilder.group({
        'firstName': '',
        'lastName': ['', Validators.required],
        'type': [data.userType, Validators.required],
        'emailAddress': ['', Validators.required]
      });

    } else {

      if (data.user!.type != data.userType) {

        this.notificationService.alert('Data mismatch', `Required user: ${ data.userType }, but ${ data.user!.type } found instead.`);
        this.close();

      }

      this.userForm = formBuilder.group({
        'firstName': data.user!.firstName || '',
        'lastName': [data.user!.lastName, Validators.required],
        'type': [data.userType, Validators.required],
        'emailAddress': [data.user!.emailAddress, Validators.required]
      });

    }


  }


  ngOnInit(): void {
  }


  submit(): void {

    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {

      let result: any = {data: this.userForm.value};

      if (!isEmpty(this.data.user)) {

        Object.assign(result, {dishId: this.data.user?._id});

      }

      this.dialogRef.close(result);

    }

  }


  close(): void {

    this.dialogRef.close(null);

  }

}
