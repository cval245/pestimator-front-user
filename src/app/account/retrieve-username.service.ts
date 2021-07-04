import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetrieveUsernameService {

    baseUrl = environment.API_URL + 'retrieve-username/';
    constructor(private http: HttpClient) { }

    public sendEmail(email: string): Observable<any>{
        let email_address = {'email':email}
        return this.http.post<Account>(this.baseUrl, email_address)
    }

}


