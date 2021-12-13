import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpAccountService} from './http-account.service';
import {Account} from './account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountResolver implements Resolve<Account> {
    constructor(private httpAcctServ: HttpAccountService){}
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Account> {
        return this.httpAcctServ.getAccount();
  }
}
