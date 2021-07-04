import { Component, OnInit } from '@angular/core';
import { ResetPasswordEmailService } from '../reset-password-email.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-email',
  templateUrl: './reset-password-email.component.html',
  styleUrls: ['./reset-password-email.component.css']
})
export class ResetPasswordEmailComponent implements OnInit {

    public email = new FormControl('', Validators.required);

    constructor(
        private route: ResetPasswordEmailService,
        private router: Router,
    ) { }

    ngOnInit(): void {

    }

    resetEmail() {
        console.log('sdf')
        //let context = this.email.value
        let context = {'email': this.email.value}
        this.route.postResetPassword(context).subscribe(complete => {
            this.router.navigateByUrl('/account/reset_password/email-success')
        })
    }
}
