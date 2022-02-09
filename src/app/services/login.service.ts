import { LoginResponse } from './../dtos/LoginResponse.dto';
import { SignupRequest } from './../dtos/SignupRequest.dto';
import { LoginRequest } from './../dtos/LoginRequest.dto';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { MessageResponse } from '../dtos/MessageResponse.dto';

const endpoint="auth/"
const ggSigninEndpoint = "oauth2/authorize/google"
@Injectable({ providedIn: "root" })
export class LoginService {
    constructor(private httpClient: HttpClient) {
    }

    loginAccount(LoginRequest: LoginRequest): Observable<LoginResponse>{
      return this.httpClient.post<LoginResponse>(endpoint+'login',LoginRequest)
    }

    signupAccount(SignupRequest: SignupRequest): Observable<MessageResponse>{
      return this.httpClient.post<MessageResponse>(endpoint+'signup',SignupRequest)
    }
}
