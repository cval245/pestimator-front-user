import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { RetrieveUsernameService } from '../retrieve-username.service';

@Component({
  selector: 'app-retrieve-username',
  templateUrl: './retrieve-username.component.html',
  styleUrls: ['./retrieve-username.component.css']
})
export class RetrieveUsernameComponent implements OnInit {

    email = new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ])
    success = false//: Boolean
    submitted = false//: Boolean

    constructor(private retrieveUserSer: RetrieveUsernameService) { }
    
    ngOnInit(): void {
    }

    sendEmail(){
        console.log('this.email', this.email, this.email.errors )
        this.submitted = true
        if (this.email.status == 'VALID'){
            this.retrieveUserSer.sendEmail(this.email.value).subscribe(console.log)
            this.success = true
        }
        else{
            
        }
    }

}
