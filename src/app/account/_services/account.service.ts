import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, interval} from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../_models/user.model';
import { environment } from '../../../environments/environment';
import { logout } from '../../store/actions/auth.action';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
    baseUrl = environment.API_URL;
    constructor(private http: HttpClient,
                private store: Store<{authCred: any}>,
                private router: Router){
    }

    ngOnDestroy(){
    }

    login(username: string, password: string): Observable<any>{
        const url = this.baseUrl + 'auth/jwt/create/'

        return this.http.post<User>(url, {username, password})
            .pipe(map(user => {
                user.username = username
                return user;
            }))
    }

    logout(){
        this.store.dispatch(logout());
        this.router.navigate(['logout'])
    }

    register(user: User) {
        const url = this.baseUrl + 'auth/users/'
        return this.http.post(url, user)
    }

    set_username(obj: any){
        let new_username = obj.new_username
        let re_new_username = obj.new_username
        let current_password = obj.password
        const url = this.baseUrl + 'auth/users/set_username/'
        return this.http.post(url, {new_username, re_new_username,
                                    current_password})
    }

    set_password(obj: any){
        const url = this.baseUrl + 'auth/users/set_password/'
        return this.http.post(url, obj)
    }


    public refreshToken_two(){
        var refresh = ''
        var access = ''
        var username = ''
        this.store.select('authCred').subscribe(x =>
            {refresh = x.profile.refresh,
             access = x.profile.access,
             username=x.profile.username})
        let refresh_two = {'refresh': refresh}
        const bob= this.http.post<{'access': string}>(
            this.baseUrl+'auth/jwt/refresh/',
            refresh_two,
        )
        return bob

    }

    public startRefreshTokenTimer_two(refresh_time: Date): Observable<any>{
        var time_diff = refresh_time.getTime() - Date.now() - (60 * 1000);
        let source = interval(time_diff)
        return source
    }
}
