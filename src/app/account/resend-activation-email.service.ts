import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ResendActivationEmailService {

    baseUrl = environment.API_URL + 'auth/users/resend_activation/';

    constructor(private http: HttpClient) {}

    public postActivateEmail(email: any){
        return this.http.post(this.baseUrl, email)
    }
}
