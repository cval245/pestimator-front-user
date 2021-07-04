import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AccountService } from '../_services/account.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signupForm = this.fb.group({
        email:['', Validators.required],
        username:['', Validators.required],
        password:['', Validators.required],
        re_password:['', Validators.required],})
    returnUrl = ''
    loading = false;
    submitted = false;
    errorMessages: any;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private accService: AccountService) { }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() {return this.signupForm.controls}

    onSubmit(){
        this.submitted = true;

        if(this.signupForm.valid) {
            this.loading = true;
            this.accService.register(this.signupForm.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(['account/activation-sent/',
                                             this.signupForm.get('email')!.value] )
                    },
                    error => {
                        let arr=[]
                        this.errorMessages = Object.keys(error.error)
                            .map((key) => [ error.error[key]] )
                        this.loading = false;
                    }
                )
        }
    }

    // FormBuilder
    // username, email, password1, password2
    // only send one password, but check if same first

    // send data to url http://8000/auth/users
    // do that in account.service.ts

    // return and send to login page


}
