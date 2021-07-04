import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    loading = false;
    submitted = false;
    resetPasswordForm = this.fb.group({
        new_password: ['', Validators.required],
        re_new_password: ['', Validators.required],
        current_password: ['', Validators.required],
    })

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private accService: AccountService,
               ) { }

    ngOnInit(): void {
    }

    get f() {return this.resetPasswordForm.controls}


    onSubmit(){
        this.submitted = true;
        if(this.resetPasswordForm.valid) {
            this.loading = true;
            this.accService.set_password(this.resetPasswordForm.value)
                .pipe(first())
                .subscribe(
                    data => {
                        this.router.navigate(['/account'])
                    },
                    error => {
                        this.loading = false;
                    }
                )
        }
    }
}
