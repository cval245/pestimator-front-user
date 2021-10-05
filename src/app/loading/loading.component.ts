import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  public loading: boolean = true
  private loadingSub: Subscription = new Subscription

  constructor(private store: Store<{loading: boolean}>) { }

  ngOnInit(): void {
    // this.store.select('loading').pipe(debounceTime(200))
    //   .subscribe((value) => {
    //     this.loading = value
    //   })
  }
  ngOnDestroy(): void{
    // this.loadingSub.unsubscribe()
  }

}
