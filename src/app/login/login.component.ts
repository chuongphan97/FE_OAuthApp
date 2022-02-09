import { LoginResponse } from './../dtos/LoginResponse.dto';
import { LoginRequest } from './../dtos/LoginRequest.dto';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginResponse!: LoginResponse ;
  form!: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["",[Validators.required]],
      password: ["", [Validators.required]],
    })
  }

  login(){
    Object.keys(this.form.controls).forEach(key => this.form.controls[key].markAsDirty());
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    const loginRequest: LoginRequest ={
      email: email,
      password: password
    }
      this.loginService.loginAccount(loginRequest).subscribe(
        res => {
          this.loginResponse= res
          console.log('object :>> ', this.loginResponse);
          this.form.reset;
          this.form.patchValue({
            email: "",
            password: ""
          })
          this.toastrService.success("Login successfully!");
        },
        error => this.toastrService.error(error.message)

      )
  }

  googleLogin() {
    window.location.href = "http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4200/oauth2/redirect"
  }

}
