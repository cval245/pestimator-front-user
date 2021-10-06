import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {SignupComponent} from './signup/signup.component';
import {AccountComponent} from './account/account.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ResetUsernameComponent} from './reset-username/reset-username.component';
import {ActivateComponent} from './activate/activate.component';
import {ResetPasswordEmailComponent} from './reset-password-email/reset-password-email.component';
import {ResetPasswordEmailConfirmationComponent} from './reset-password-email-confirmation/reset-password-email-confirmation.component';
import {PasswordResetSuccessComponent} from './password-reset-success/password-reset-success.component';
import {PasswordResetEmailSentComponent} from './password-reset-email-sent/password-reset-email-sent.component';
import {ActivateEmailSentComponent} from './activate-email-sent/activate-email-sent.component';
import {RetrieveUsernameComponent} from './retrieve-username/retrieve-username.component';
import {LoggedInGuard} from '../_guards/logged-in.guard';
import {BuyNewEstimateComponent} from "./buy-new-estimate/buy-new-estimate.component";
import {CheckoutSuccessComponent} from "./checkout-success/checkout-success.component";
import {CheckoutCancelComponent} from "./checkout-cancel/checkout-cancel.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {BuyEstimateGuard} from "./buy-estimate.guard";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {TermsOfUseComponent} from "./terms-of-use/terms-of-use.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'signup', component: SignupComponent},

  {path: 'checkout/success', component: CheckoutSuccessComponent, canActivate: [LoggedInGuard]},
  {path: 'checkout/cancel', component: CheckoutCancelComponent, canActivate: [LoggedInGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [LoggedInGuard]},
  {
    path: 'buy-new-estimate', component: BuyNewEstimateComponent,
    canActivate: [BuyEstimateGuard, LoggedInGuard]
  },
  {path: 'activation-sent/:email', component: ActivateEmailSentComponent},
  {path: 'activate/:uid/:token', component: ActivateComponent},
  {path: 'reset_password', component: ResetPasswordEmailComponent},
  {
    path: 'reset_password/email-success',
    component: PasswordResetEmailSentComponent
  },
  {
    path: 'password-reset/:uid/:token',
    component: ResetPasswordEmailConfirmationComponent
  },
  {
    path: 'password-reset/success',
    component: PasswordResetSuccessComponent
  },
  {path: 'retrieve-username', component: RetrieveUsernameComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'terms-of-use', component: TermsOfUseComponent},

  {
    path: '', component: AccountComponent,
    children: [
      {
        path: 'username-form',
        component: ResetUsernameComponent,
        outlet: 'resetusername',
      },
      {
        path: 'password-form',
        component: ResetPasswordComponent,
        outlet: 'resetpassword',
      },
    ],

    canActivate: [LoggedInGuard],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
