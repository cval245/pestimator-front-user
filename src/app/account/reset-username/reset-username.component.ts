import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {AccountService} from '../../_services/account.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-reset-username',
  templateUrl: './reset-username.component.html',
  styleUrls: ['./reset-username.component.scss']
})

export class ResetUsernameComponent implements OnInit {

    loading = false;
    submitted = false;
    //resetUsernameForm: FormGroup;
    resetUsernameForm = this.fb.group({
        new_username: ['', Validators.required],
        password: ['', Validators.required],
    })
    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private accService: AccountService,
               ) { }

    ngOnInit(): void {
        // this.resetUsernameForm = this.fb.group({
        //     new_username: ['', Validators.required],
        //     password: ['', Validators.required],
        // })
    }

    get f() {return this.resetUsernameForm.controls}


    onSubmit(){
        this.submitted = true;
        if(this.resetUsernameForm.valid) {
            this.loading = true;
            this.accService.set_username(this.resetUsernameForm.value)
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
