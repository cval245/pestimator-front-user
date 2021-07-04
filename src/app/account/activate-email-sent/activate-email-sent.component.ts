import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResendActivationEmailService } from '../resend-activation-email.service';
@Component({
  selector: 'app-activate-email-sent',
  templateUrl: './activate-email-sent.component.html',
  styleUrls: ['./activate-email-sent.component.css']
})
export class ActivateEmailSentComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private emailSer: ResendActivationEmailService,
    ) { }

    ngOnInit(): void {
    }

    resendEmail(){
        let email = this.route.snapshot.params.email
        console.log('e', email)
        let context = {'email': email}
        this.emailSer.postActivateEmail(context).subscribe(complete =>{
            console.log('submitted')
        })
  }
}
