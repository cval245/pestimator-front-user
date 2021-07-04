import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { Store } from '@ngrx/store';
import { login } from '../../store/actions/auth.action';
import { Credentials } from '../_models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    returnUrl = ''
    loading = false;
    submitted = false;
    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    })
    message=''


    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private store: Store,
               ) { }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() {return this.loginForm.controls;}

    onSubmit(){
        this.submitted = true;
        if (this.loginForm.valid){
            let credentials = new Credentials(this.f.username.value, this.f.password.value)
            console.log('payload', credentials)
            this.store.dispatch(login({credentials}))
        }
    }

}
