import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SessionService } from "../../../shared/core/services/session/session.service";
import { Router } from "@angular/router";
import { E_UserType } from "../../../shared/core/models/global/static.enums";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private router: Router
  ) {

    this.signUpForm = formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'emailAddress': ['', Validators.required],
      'password': ['', Validators.required],
    });

  }


  ngOnInit(): void {

  }


  signUp(): void {

    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.valid) {

      Object.assign(this.signUpForm.value, { type: E_UserType.CUS });

      this.sessionService.register({...this.signUpForm.value}).subscribe((status) => {

        if (status) this.router.navigate([`/${ this.sessionService.getUrlPart() }/restaurants`]).then();

      });

    }

  }

}
