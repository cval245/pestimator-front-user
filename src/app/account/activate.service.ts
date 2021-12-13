import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Activate} from './activate.model';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

    baseUrl = environment.API_URL + 'auth/users/activation/';
    constructor(private http: HttpClient) {
    }

    public postActivate(activate: Activate): Observable<Activate>{
        return this.http.post<Activate>(this.baseUrl, activate)
    }
}
