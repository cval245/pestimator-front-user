import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {debounceTime, delay, takeUntil} from "rxjs/operators";
import {Subject, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints, MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mobileQuery: MediaQueryList
  title = 'front-admin';
  isLoggedIn = false;
  public loading: boolean = false
  private loadingSub: Subscription = new Subscription
  private _mobileQueryListener: () => void;
  public showMenuBool: boolean = false;
  mobile_bool: boolean = false;

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
    private store: Store<{ authCred: any, loading: boolean, menuOpen: boolean, }>,
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).pipe(takeUntil(this.destroyed), delay(0)).subscribe(result =>{
      for (const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          if (this.currentScreenSize == 'Small' || this.currentScreenSize == 'XSmall'){
            this.mobile_bool=true
          } else{
            this.mobile_bool=false
          }

        }
      }
    })
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {

    this.store.select('authCred').pipe(takeUntil(this.destroyed), delay(0)
    ).subscribe(x => {
      this.isLoggedIn = x.isLoggedIn
      if (this.isLoggedIn) {
        this.contentClass = 'logged-in-over-main'
      } else {
        this.contentClass = 'fullSize'
      }
      // this.changeDetectorRef.detectChanges()

    })
    this.store.select('loading').pipe(takeUntil(this.destroyed), delay(0), debounceTime(500))
      .subscribe((value: any) => {
        this.loading = value.loading
      })
    this.store.select('menuOpen').pipe(takeUntil(this.destroyed), delay(0)).subscribe((x: any) => {
      this.showMenuBool = x.menuOpen
    })
  }

  ngOnDestroy(): void{
    this.loadingSub.unsubscribe()
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener)
    this.destroyed.next()
    this.destroyed.complete()
  }
}
