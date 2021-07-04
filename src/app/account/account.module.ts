import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetUsernameComponent } from './reset-username/reset-username.component';
import { ActivateComponent } from './activate/activate.component';
import { ResetPasswordEmailComponent } from './reset-password-email/reset-password-email.component';
import { ResetPasswordEmailConfirmationComponent } from './reset-password-email-confirmation/reset-password-email-confirmation.component';
import { PasswordResetSuccessComponent } from './password-reset-success/password-reset-success.component';
import { PasswordResetEmailSentComponent } from './password-reset-email-sent/password-reset-email-sent.component';
import { ActivateEmailSentComponent } from './activate-email-sent/activate-email-sent.component';
import { RetrieveUsernameComponent } from './retrieve-username/retrieve-username.component';
import { AccountRoutingModule } from './account-routing.module';
import { MatTableModule } from '@angular/material/table';
import { AccountDetailsFormComponent } from './account-details-form/account-details-form.component';

@NgModule({
    declarations: [
        LogoutComponent,
        LoginComponent,
        SignupComponent,
        AccountComponent,
        ResetPasswordComponent,
        ResetUsernameComponent,
        ActivateComponent,
        ResetPasswordEmailComponent,
        ResetPasswordEmailConfirmationComponent,
        PasswordResetSuccessComponent,
        PasswordResetEmailSentComponent,
        ActivateEmailSentComponent,
        RetrieveUsernameComponent,
        AccountDetailsFormComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatTableModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        AccountRoutingModule,
    ],
    providers: [
    ]
})
export class AccountModule { }
