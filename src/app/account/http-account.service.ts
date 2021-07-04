import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from './account.model';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpAccountService {

    //baseUrl= `http://127.0.0.1:8000/account/`;
    baseUrl = environment.API_URL + 'account/';
    constructor(private http: HttpClient) { }

    public getAccount(): Observable<Account>{
        return this.http.get<Account>(this.baseUrl)
    }

    public saveAccount(account: Account): Observable<Account>{
        //lineEst.application_type = appl.application_type.id
        return this.http.post<Account>(this.baseUrl, account)
    }

    public updateAccount(account: Account): Observable<Account>{
        return this.http.put<Account>(`${this.baseUrl}${account.id}/`, account)
    }

    public deleteAccount(id: number): Observable<Account>{
        return this.http.delete<Account>(`${this.baseUrl}${id}`)
    }




}
