import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordEmailConfirmationService {
    baseUrl = environment.API_URL + 'auth/users/reset_password_confirm/';
    constructor(private http: HttpClient) { }

    public postResetPassword(context: any) {
        return this.http.post(this.baseUrl, context)
    }
}
