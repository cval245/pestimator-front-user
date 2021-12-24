import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Activate} from '../activate.model'
import {ActivateService} from '../activate.service';
import {AccountService} from '../../_services/account.service';
import {User} from '../../_models/user.model';


@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit {

  //private activate: Activate
    public user = new User('','','')//: User
    constructor(
        private route: ActivatedRoute,
        private http: ActivateService,
        private accSer: AccountService,
               ) {

    }

    ngOnInit(): void {
        let activate = new Activate(this.route.snapshot.params.uid,
                                   this.route.snapshot.params.token)
        activate.uid = this.route.snapshot.params.uid
        activate.token = this.route.snapshot.params.token
        // let jwt = this.route.snapshot.params.jwt
        // jwt.username = 'tim'
        // localStorage.setItem('user', this.route.snapshot.params.jwt)
//        let refresh = this.route.snapshot.params.refresh
//        let access = this.route.snapshot.params.access
//        let username = this.route.snapshot.params.username

//        this.user = new User(username, access, refresh)
        //this.accSer.userSubject.next(this.user)
        this.http.postActivate(activate).subscribe(x => console.log('x', x))

  }



}
