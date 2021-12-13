import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordEmailService {

    baseUrl = environment.API_URL + 'auth/users/reset_password/';
    constructor(private http: HttpClient) { }

    public postResetPassword(context: any) {
        return this.http.post(this.baseUrl, context)
    }
}



