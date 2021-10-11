import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserProfileService} from "./_services/user-profile.service";
import {UserProfile} from "./_models/userProfile.model";

@Injectable({
  providedIn: 'root'
})
export class BuyEstimateGuard implements CanActivate {
  userProfile: UserProfile = new UserProfile()
  return_bool = false
  constructor(public router: Router, private userProfileSer: UserProfileService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userProfileSer.getAll().subscribe(data => {
      this.userProfile = data[0]
      if(this.userProfile === undefined || this.userProfile.id==undefined){
        this.router.navigateByUrl('/account/user-profile')
        this.return_bool=false;
      }
      else{
        this.return_bool = true
        this.router.navigateByUrl('/account/buy-new-estimate')
      }
    })

    return this.return_bool;
  }
}
