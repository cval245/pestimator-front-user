import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {DefaultDataServiceConfig, EntityDataModule, HttpUrlGenerator} from '@ngrx/data';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


import {metaReducers} from './store/storage.metareducer';
import {entityConfig} from './entity-metadata';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {JwtInterceptor} from './account/_helpers/jwt.interceptor';
import {environment} from '../environments/environment';
import {AuthEffectsNew} from './store/effects/auth.effect';
import {LandingRoutingModule} from './landing/landing-routing.module';
import {LandingModule} from './landing/landing.module';
import {authReducer} from './store/reducers/auth.reducers';
import {MyHttpUrlGenerator} from './my-http-url-generator';
import {HeaderComponent} from './header/header.component';
import {NavComponent} from './nav/nav.component';
import {MainComponent} from './main/main.component';
import {AsideComponent} from './aside/aside.component';
import {FooterComponent} from './footer/footer.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ContentFreeRoutingModule} from "./content-free/content-free-routing.module";
import {ContentFreeModule} from "./content-free/content-free.module";
import {loadingReducer} from "./store/reducers/loading.reducers";
import {LoadingScreenInterceptor} from "./account/_helpers/loading-screen.interceptor";
import {LoadingComponent} from "./loading/loading.component";
import {MatIconModule} from "@angular/material/icon";
import {RECAPTCHA_SETTINGS, RecaptchaSettings} from "ng-recaptcha";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {menuOpenReducer} from "./store/reducers/menu.reducers";
import {defaultDataServiceConfig} from "./store/dataserviceconfig";
import {customDetailsReducer} from "./store/reducers/customDetails.reducers";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    AsideComponent,
    FooterComponent,
    NotFoundComponent,
    LoadingComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    LandingModule,
    ContentFreeModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatDividerModule,
    StoreModule.forRoot({
        'loading': loadingReducer,
        'authCred': authReducer,
        'menuOpen': menuOpenReducer,
        'customDetails': customDetailsReducer,
      },
      {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AuthEffectsNew]),
    EntityDataModule.forRoot(entityConfig),
    LandingRoutingModule,
    ContentFreeRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,

  ],

  providers: [
    {provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor, multi: true
    },
    {provide: HttpUrlGenerator, useClass: MyHttpUrlGenerator},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'},
    {provide: RECAPTCHA_SETTINGS,
    useValue: {siteKey: environment.RECAPTCHA_SITE_KEY} as RecaptchaSettings}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
