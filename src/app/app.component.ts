import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {debounceTime, delay, takeUntil} from "rxjs/operators";
import {combineLatest, Subject} from "rxjs";
import {BreakpointObserver, Breakpoints, MediaMatcher} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-admin';
  public isLoggedIn = false;
  public loading: boolean = false
  public showMenuBool: boolean = false;
  public mobile_bool: boolean = false;

  private destroyed = new Subject<void>();
  public currentScreenSize: string = '';

  public displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  contentClass: string = 'fullSize';

  constructor(
    breakpointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private route: ActivatedRoute,
    private store: Store<{ authCred: any, loading: boolean, menuOpen: boolean, landing: { landing: boolean } }>,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed), delay(0)).subscribe(result => {
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          this.mobile_bool = this.currentScreenSize == 'Small' || this.currentScreenSize == 'XSmall';

        }
      }
    })
  }

  ngOnInit(): void {
    combineLatest([this.store.select('authCred'), this.store.select('landing')])
      .pipe(takeUntil(this.destroyed), delay(0)
      ).subscribe(([storeVal, landingBool]) => {
      if (storeVal !== undefined) {
        this.isLoggedIn = storeVal.isLoggedIn
        if (this.isLoggedIn) {
          this.contentClass = 'logged-in-over-main'
        } else if (landingBool.landing) {
          this.contentClass = 'fullSizeLanding'
        } else {
          this.contentClass = 'fullSize'
        }
      }
    })
    this.store.select('loading').pipe(takeUntil(this.destroyed), delay(0), debounceTime(500))
      .subscribe((value: any) => {
        if (value !== undefined) {
          this.loading = value.loading
        }
      })
    this.store.select('menuOpen').pipe(takeUntil(this.destroyed), delay(0)).subscribe((x: any) => {
      if (x !== undefined) {
        this.showMenuBool = x.menuOpen
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed.next()
    this.destroyed.complete()
  }
}
