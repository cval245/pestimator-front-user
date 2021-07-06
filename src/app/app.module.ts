import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DefaultDataService, DefaultDataServiceConfig, EntityDataModule, EntityDataService, HttpUrlGenerator } from '@ngrx/data';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


import { environment as env } from '../environments/environment';
import { metaReducers } from './store/storage.metareducer';
import { entityConfig } from './entity-metadata';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountModule } from './account/account.module';
import { AccountRoutingModule } from './account/account-routing.module';
import { HomeRoutingModule } from './home/home-routing.module';
import { LawFirmRoutingModule } from './law-firm/law-firm-routing.module';
import { JwtInterceptor } from './account/_helpers/jwt.interceptor';
import { environment } from '../environments/environment';
import { AuthEffects, AuthEffectsNew } from './store/effects/auth.effect';
//import { reducers } from './store/app.states';
import { LandingRoutingModule } from './landing/landing-routing.module';
import { LandingModule } from './landing/landing.module';
import * as fromRedu from './store/reducers/auth.reducers';
import { MyHttpUrlGenerator }from './my-http-url-generator';
import {LawFirm} from './law-firm/_models/law-firm.model'
import { EstimationRoutingModule } from './estimation/estimation-routing.module';
import { FamEst } from './estimation/_models/FamEst.model';
import { HomeModule } from './home/home.module';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { LawFirmModule } from './law-firm/law-firm.module';
import { EstimationModule } from './estimation/estimation.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { MyDataService } from './store/entity/my-data-service';

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
    root: environment.API_URL,
    entityHttpResourceUrls: {
        LawFirm: {
            entityResourceUrl: environment.API_URL + 'lawfirms/',
            collectionResourceUrl: environment.API_URL + 'lawfirms/'
        },
        FamEst: {
            entityResourceUrl: environment.API_URL + 'fam-est/',
            collectionResourceUrl: environment.API_URL + 'fam-est/',
        },
        Country: {
            entityResourceUrl: environment.API_URL + 'countries/',
            collectionResourceUrl: environment.API_URL + 'countries/',
        },
        FamEstDetail: {
            entityResourceUrl: environment.API_URL + 'fam-est-detail/',
            collectionResourceUrl: environment.API_URL + 'fam-est-detail/',
        },
        EntitySize: {
            entityResourceUrl: environment.API_URL + 'entity-size/',
            collectionResourceUrl: environment.API_URL + 'entity-size/',
        },
        ApplType: {
            entityResourceUrl: environment.API_URL + 'appl-types/',
            collectionResourceUrl: environment.API_URL + 'appl-types/',
        },
        FamEstForm: {
            entityResourceUrl: environment.API_URL + 'fam-est-form-data/',
            collectionResourceUrl: environment.API_URL + 'fam-est-form-data/',
        },
        Family: {
            entityResourceUrl: environment.API_URL + 'families/',
            collectionResourceUrl: environment.API_URL + 'families/',
        },
        UserProfile: {
            entityResourceUrl: environment.API_URL + 'account/',
            collectionResourceUrl: environment.API_URL + 'account/',
        },
        Application: {
            entityResourceUrl: environment.API_URL + 'applications/',
            collectionResourceUrl: environment.API_URL + 'applications/',
        },
        ApplDetail: {
            entityResourceUrl: environment.API_URL + 'specs/',
            collectionResourceUrl: environment.API_URL + 'specs/',
        },


        CustomFilTrans: {
            entityResourceUrl: environment.API_URL + 'custom-filing-transform',
            collectionResourceUrl: environment.API_URL + 'custom-filing-transform',
        },
        PublTrans: {
            entityResourceUrl: environment.API_URL + 'publication-transform',
            collectionResourceUrl: environment.API_URL + 'publication-transform',
        },
        OATrans: {
            entityResourceUrl: environment.API_URL + 'oa-transform',
            collectionResourceUrl: environment.API_URL + 'oa-transform',
        },
        AllowTrans: {
            entityResourceUrl: environment.API_URL + 'allowance-transform',
            collectionResourceUrl: environment.API_URL + 'allowance-transform',
        },
        IssueTrans: {
            entityResourceUrl: environment.API_URL + 'issue-transform',
            collectionResourceUrl: environment.API_URL + 'issue-transform',
        },
        CountryOANum: {
            entityResourceUrl: environment.API_URL + 'country-oanum',
            collectionResourceUrl: environment.API_URL + 'country-oanum',
        },

        BaseEstTemp: {
            entityResourceUrl: environment.API_URL + 'base-est-template',
            collectionResourceUrl: environment.API_URL + 'base-est-template',
        },  
        FilEstTemp: {
            entityResourceUrl: environment.API_URL + 'filing-est-template',
            collectionResourceUrl: environment.API_URL + 'filing-est-template',
        },  
        PublEstTemp: {
            entityResourceUrl: environment.API_URL + 'publication-est-template',
            collectionResourceUrl: environment.API_URL + 'publication-est-template',
        },
        OAEstTemp: {
            entityResourceUrl: environment.API_URL + 'oa-est-template',
            collectionResourceUrl: environment.API_URL + 'oa-est-template',
        },
        AllowEstTemp: {
            entityResourceUrl: environment.API_URL + 'allowance-est-template',
            collectionResourceUrl: environment.API_URL + 'allowance-est-template',
        },
        IssueEstTemp: {
            entityResourceUrl: environment.API_URL + 'issue-est-template',
            collectionResourceUrl: environment.API_URL + 'issue-est-template',
        },
    }
}


@NgModule({
  declarations: [
      AppComponent,
      HeaderComponent,
      NavComponent,
      MainComponent,
      AsideComponent,
      FooterComponent,
      NotFoundComponent,
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AccountModule,
        LandingModule,
        HomeModule,
        LawFirmModule,
        EstimationModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatDividerModule,
        StoreModule.forRoot({//'fromRedu': fromRedu.reducer,
                             'authCred': fromRedu.authReducer,
                            },
                            {metaReducers}),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        }),
        EffectsModule.forRoot([AuthEffects, AuthEffectsNew]),
        EntityDataModule.forRoot(entityConfig),
        AccountRoutingModule,
        HomeRoutingModule,
        LawFirmRoutingModule,
        EstimationRoutingModule,
        LandingRoutingModule,
        HomeRoutingModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
    ],

    providers: [
        {provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
        {provide: HTTP_INTERCEPTORS,
         useClass: JwtInterceptor, multi: true},
        {provide: HttpUrlGenerator, useClass: MyHttpUrlGenerator},
],
  bootstrap: [AppComponent]
})

export class AppModule {
}
