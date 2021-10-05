import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {filter, takeUntil} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {login} from '../../store/actions/auth.action';
import {Credentials} from '../_models/credentials.model';
import {Subject} from "rxjs";

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

    private destroyed = new Subject<void>()

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private store: Store<{ authCred: any }>,
    ) { }

    ngOnInit(): void {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.store.select('authCred').pipe(
        takeUntil(this.destroyed),
        filter(x => x.error)
      )
        .subscribe(error => {
          this.error_bool = true
          this.error = error
        })
    }

  get f() {
    return this.loginForm.controls;
  }

    onSubmit(){
        this.submitted = true;
        if (this.loginForm.valid){
            let credentials = new Credentials(this.f.username.value, this.f.password.value)
            this.store.dispatch(login({credentials}))
        }
    }
    ngOnDestroy(){
      this.destroyed.next()
      this.destroyed.complete()
    }

}
