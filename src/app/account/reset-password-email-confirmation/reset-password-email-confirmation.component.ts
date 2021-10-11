import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordEmailConfirmationService} from '../reset-password-email-confirmation.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password-email-confirmation',
  templateUrl: './reset-password-email-confirmation.component.html',
  styleUrls: ['./reset-password-email-confirmation.component.css']
})
export class ResetPasswordEmailConfirmationComponent implements OnInit {

  passResetForm = new FormGroup({
    uid: new FormControl(''),
        token: new FormControl(''),
        new_password: new FormControl('', Validators.required),
        re_new_password: new FormControl('', Validators.required)
    })

    constructor(
        private dataSource: ResetPasswordEmailConfirmationService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    submitReset() {
        let context = this.passResetForm.value
        let uid = this.route.snapshot.params.uid
        let token = this.route.snapshot.params.token
        if (this.passResetForm.valid){
            this.passResetForm.controls.uid.patchValue(uid)
            this.passResetForm.controls.token.patchValue(token)!
        this.dataSource.postResetPassword(context).subscribe(complete => {
            this.router.navigateByUrl('/account/password-reset/success')
        })
        }
    }

}
