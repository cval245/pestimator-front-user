import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'front-user';
    isLoggedIn = false;

    constructor(
        private store: Store<{authCred: any}>,
    ){}
    ngOnInit(){
        this.store.select('authCred').subscribe(x =>
            { this.isLoggedIn = x.isLoggedIn})

    }
}
