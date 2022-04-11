import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { isEmpty } from "../../../core/services/utils/utils.service";
import { NotificationService } from "../../../core/services/notification/notification.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { SessionService } from "../../../core/services/session/session.service";
import { BehaviorSubject } from "rxjs";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { faCircleCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";


const VISIBLE: string = 'fa-circle-check';

@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss']
})
export class DishModalComponent implements OnInit {

  dishForm: FormGroup;

  isVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  visible: string[] = [];

  notVisible: string[] = [];

  faCircleCheck: IconDefinition = faCircleCheck;

  constructor(
    private sessionService: SessionService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<DishModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (isEmpty(data) || isEmpty(data.title)) {

      this.notificationService.alert('Data not found', `Missing data.`);
      this.close();

    }

    if (isEmpty(data.dish)) {

      this.notVisible.push(VISIBLE);
      this.visible = [];

      this.dishForm = formBuilder.group({
        'picture': '',
        'name': ['', Validators.required],
        'purchasePrice': ['', Validators.required],
        'costPrice': ['', Validators.required],
        'salePrice': ['', Validators.required],
      });

    } else {

      if (data.dish.visible) {

        this.visible.push(VISIBLE);
        this.notVisible = [];

      } else {

        this.notVisible.push(VISIBLE);
        this.visible = [];

      }

      this.dishForm = formBuilder.group({
        'picture': '',
        'name': [data.dish.name, Validators.required],
        'purchasePrice': [data.dish.purchasePrice, Validators.required],
        'costPrice': [data.dish.costPrice, Validators.required],
        'salePrice': [data.dish.salePrice, Validators.required],
      });

    }


  }


  ngOnInit(): void {
  }

  onFileChange($event: any): void {

    const file: File = $event.target.files[0];

    console.log(file);

  }

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {

      this.isVisible.next(event.container.id == 'cdk-drop-list-0');

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

    }

  }
  submit(): void {

    this.dishForm.markAllAsTouched();

    if (this.dishForm.valid) {

      const formData = this.dishForm.value;

      if (isNaN(Number(formData.costPrice)) || isNaN(Number(formData.salePrice)) || isNaN(Number(formData.purchasePrice))) {

        this.notificationService.alert('Type error!', 'each price must be a number', 'error');
        return;

      }

      delete formData.pricture;

      Object.assign(formData, {
        costPrice: Number(formData.costPrice),
        salePrice: Number(formData.salePrice),
        purchasePrice: Number(formData.purchasePrice),
        visible: this.isVisible.value,
        restaurant: this.sessionService.onlineUser.value?._id
      });

      let result: any = {data: formData};

      if (!isEmpty(this.data.dish)) {

        Object.assign(result, {dishId: this.data.dish?._id});

      }

      this.dialogRef.close(result);

    }

  }


  close(): void {

    this.dialogRef.close(null);

  }

}
