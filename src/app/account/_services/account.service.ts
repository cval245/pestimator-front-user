import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {from, Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';

import {User} from '../_models/user.model';
import {environment} from '../../../environments/environment';
import {logout} from '../../store/actions/auth.action';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
    baseUrl = environment.API_URL + 'auth/';

    constructor(private http: HttpClient,
                private store: Store<{authCred: any}>,
                private router: Router){
    }

    login(username: string, password: string): Observable<any>{
        const url = this.baseUrl + 'jwt/create/'
        return this.http.post<User>(url, {username, password})
    }

    logout(){
        this.store.dispatch(logout());
        let succ = this.router.navigate(['account/logout'])
        return from(succ)
    }

    register(user: User) {
        const url = this.baseUrl + 'users/'
        return this.http.post(url, user)
    }

    set_username(obj: any){
        let new_username = obj.new_username
        let re_new_username = obj.new_username
        let current_password = obj.password
        const url = this.baseUrl + 'users/set_username/'
        return this.http.post(url, {new_username, re_new_username,
                                    current_password})
    }

    set_password(obj: any){
        const url = this.baseUrl + 'users/set_password/'
        return this.http.post(url, obj)
    }


    public refreshToken_two(refresh: string){
        let refresh_two = {'refresh': refresh}
        //console.log('refresh_tow', refresh_two)
        const bob= this.http.post<{'access': string}>(
            this.baseUrl+'jwt/refresh/',
            refresh_two,
        )
        return bob

    }

    public startRefreshTokenTimer_two(refresh_time: Date): Observable<any>{
        var time_diff = refresh_time.getTime() - Date.now() - (60 * 1000);
        if (time_diff < 0){
            throw "negative time on access token"
        }
        let timerSubj = new Subject<void>()
        setTimeout(() => {
            timerSubj.next()
            timerSubj.complete()
            //this.timerSubj.next(1)
            //this.timerSubj.complete()
        }, time_diff)
        return timerSubj
    }
}
