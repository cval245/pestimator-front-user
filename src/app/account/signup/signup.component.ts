import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators} from '@angular/forms'
import {AccountService} from '../../_services/account.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


    signupForm = this.fb.group({
        recaptcha:[null, Validators.required],
        email:['', Validators.compose([Validators.email,
                    Validators.required])],
        username:['', Validators.required],
        password:['', Validators.compose(
          [Validators.minLength(8),
          this.PasswordValidator(),
          Validators.required]
        )],
      re_password:['', Validators.compose(
        [this.PasswordSameValidator(),
          Validators.required]
      )],
      terms_agreed: [false, Validators.requiredTrue],
        })
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

    PasswordValidator(): ValidatorFn{
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value){
          return null;
        }
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
        let error_return = {
          hasUpperCase: hasUpperCase,
          hasLowerCase: hasLowerCase,
          hasNumeric: hasNumeric
        }
        return !passwordValid ? {passwordStrength: error_return}: null;
      }
    }
    PasswordSameValidator(): ValidatorFn{
      return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value){
          return null;
        }
        const passwordSame = value == this.f.password.value
        return !passwordSame ? {passwordSame: true}: null;
      }
    }
    getErrorMessage(){
      if (this.f.password.errors) {
        if (this.f.password.errors.required) {
          return 'Password is required'
        }else if (this.f.password.errors.minlength) {
          return '8 character minimum'
        }else if (this.f.password.errors.passwordStrength){
          if (!this.f.password.errors.passwordStrength.hasUpperCase) {
            return 'required upper case char'
          } else if (!this.f.password.errors.passwordStrength.hasLowerCase) {
            return 'required lower case char'
          } else if (!this.f.password.errors.passwordStrength.hasNumeric) {
            return 'required Number'
          }
        }
      }
      return null
    }
    getRePassErrorMessage(){
      if (this.f.re_password.errors) {
        if (this.f.re_password.errors.required) {
          return 'Repeat Password'
        } else if (this.f.re_password.errors.passwordSame) {
          return 'passwords do not match'
        }
      }
      return null
    }

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
