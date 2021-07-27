import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-admin';
  isLoggedIn = false;

  constructor(
    private store: Store<{ authCred: any }>,
  ) {
  }

  ngOnInit(): void {
    this.store.select('authCred').subscribe(x => {
      this.isLoggedIn = x.isLoggedIn
    })

  }
}
