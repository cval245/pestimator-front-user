import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {filter} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {login} from '../../store/actions/auth.action';
import {Credentials} from '../_models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  error: any
  error_bool = false
  returnUrl = ''
  loading = false;
  submitted = false;
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })
  message = ''


    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private store: Store<{ authCred: any }>,
    ) { }

    ngOnInit(): void {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.store.select('authCred').pipe(
        filter(x => x.error)
      )
        .subscribe(error => {
          console.log('this.error_bool', this.error_bool)
          this.error_bool = true

          console.log('this.error_bool', this.error_bool)
          this.error = error
          console.log('ttt', this.error)
          console.log('ttt', this.error.error.error.error.detail)
        })
    }

  get f() {
    return this.loginForm.controls;
  }

    onSubmit(){
        this.submitted = true;
        if (this.loginForm.valid){
            let credentials = new Credentials(this.f.username.value, this.f.password.value)
            console.log('payload', credentials)
            this.store.dispatch(login({credentials}))
        }
    }

}
