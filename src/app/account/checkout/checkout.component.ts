import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StripeService} from "ngx-stripe";
import {switchMap} from "rxjs/operators";
import {FormControl, Validators} from "@angular/forms";
import {environment} from "../../../environments/environment";

interface objID{
  id: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  //quantity: number = 1;
  quantity_form = new FormControl(1,
    [Validators.max(10), Validators.min(1)])

  constructor(
    private http: HttpClient,
    private stripeService: StripeService
  ) { }

  checkout(){
    if(this.quantity_form.valid) {
      let url = environment.API_URL + 'checkout/'
      this.http.post(url,
        {'quantity': this.quantity_form.value})
        .pipe(
          switchMap(session => {
            // @ts-ignore
            return this.stripeService.redirectToCheckout(({sessionId: session.id}))
          }))
        .subscribe((result => {
          if (result.error) {
            alert(result.error.message);
          }
        }))
    }
  }
}
