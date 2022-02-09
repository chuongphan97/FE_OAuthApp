import { MessageResponse } from './../dtos/MessageResponse.dto';
import { SignupRequest } from './../dtos/SignupRequest.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  messageResponse!: MessageResponse;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ["",[Validators.required]],
      email: ["",[Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: [""]
    },{
      validator: MustMatch('password','confirmPassword')
    })
  }


  signup(){
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsDirty());

    if (this.form.invalid) return;
    const { name,email, password } = this.form.value;

    const signupRequest: SignupRequest ={
      name: name,
      email: email,
      password: password
    }
      this.loginService.signupAccount(signupRequest).subscribe(
        res => {
          this.messageResponse= res
          // this.form.reset;
          // this.form.patchValue({
          //   name: "",
          //   email: "",
          //   password: ""
          // })
          this.toastrService.success("Signup successfully!");
         this.router.navigate(['/login'])

        },
        error => this.toastrService.error(error.message)

      )
  }
}
function MustMatch(arg0: string, arg1: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[arg0];
    const matchingControl = formGroup.controls[arg1];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null);
    }
}
}

