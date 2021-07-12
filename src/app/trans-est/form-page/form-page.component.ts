import { Component, OnInit } from '@angular/core';
import { map } from 'lodash';
import { Subscription, combineLatest } from 'rxjs';
import { ApplType } from 'src/app/characteristics/_models/applType.model';
import { Country } from 'src/app/characteristics/_models/Country.model';
import { ApplTypeService } from 'src/app/characteristics/_services/appl-type.service';
import { CountryService } from 'src/app/characteristics/_services/country.service';
import { IAllowTrans } from '../_models/AllowTrans.model';
import { ICountryOANum } from '../_models/CountryOANum.model';
import { ICustomFilTrans } from '../_models/CustomFilTrans.model';
import { IIssueTrans } from '../_models/IssueTrans.model';
import { IOATrans } from '../_models/OATrans.model';
import { IPublTrans } from '../_models/PublTrans.model';
import { AllowTransService } from '../_services/allow-trans.service';
import { CountryOanumService } from '../_services/country-oanum.service';
import { CustomFilTransService } from '../_services/custom-fil-trans.service';
import { IssueTransService } from '../_services/issue-trans.service';
import { OaTransService } from '../_services/oa-trans.service';
import { PublTransService } from '../_services/publ-trans.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  private csmt$: Subscription = new Subscription
  private cmbLat: Subscription = new Subscription
  public countries: Country[] = [new Country(0, '', '')]
  public applTypes: ApplType[] = [new ApplType()]
  public cstmFilTrans = new Array<ICustomFilTrans>()
  public publTrans = new Array<IPublTrans>()
  public oaTrans = new Array<IOATrans>()
  public allowTrans = new Array<IAllowTrans>()
  public issueTrans = new Array<IIssueTrans>()
  public oaNum = new Array<ICountryOANum>()

  constructor(
    private countrySer: CountryService,
    private cstmFilSer: CustomFilTransService,
    private publTranSer: PublTransService,
    private oaTranSer: OaTransService,
    private allowTranSer: AllowTransService,
    private issueTranSer: IssueTransService,
    private oaNumSer: CountryOanumService,
    private applTypeSer: ApplTypeService,
    ) {
  
    let comb_1 = combineLatest([
      this.countrySer.entities$,
      this.cstmFilSer.entities$,
      this.publTranSer.entities$,
      this.oaTranSer.entities$,
      this.allowTranSer.entities$,
      this.issueTranSer.entities$,
    ])
    let comb_2 = combineLatest([
      this.oaNumSer.entities$,
      this.applTypeSer.entities$])
    this.cmbLat = combineLatest([comb_1, comb_2]).subscribe(data => {
      this.countries = data[0][0]
      let cstmFilTrans = data[0][1]
      let publTrans = data[0][2]
      let oaTrans = data[0][3]
      let allowTrans = data[0][4]
      let issueTrans = data[0][5]
      let oaNum = data[1][0]
      this.applTypes = data[1][1]
      
      this.cstmFilTrans = map(cstmFilTrans, (x: ICustomFilTrans) => {
        let d = this.countries.find(y => y.id == x.country);
        let applType = this.applTypes.find(z => z.id == x.appl_type)
        let prevApplType = this.applTypes.find(a => a.id == x.prev_appl_type)
        return {...x, 'country': d?.country, 
                'currency_name': d?.currency_name,
                'appl_type': applType,
                'prev_appl_type': prevApplType,
              }
      })
      this.publTrans = map(publTrans, (x: IPublTrans) => {
        let d = this.countries.find(y => y.id == x.country);
        return {...x, 'country': d?.country, 'currency_name': d?.currency_name}
      })
      
      this.oaTrans = map(oaTrans, (x: IOATrans) => {
        let d = this.countries.find(y => y.id == x.country);
        return {...x, 'country': d?.country, 'currency_name': d?.currency_name}
      })

      this.allowTrans = map(allowTrans, (x: IAllowTrans) => {
        let d = this.countries.find(y => y.id == x.country);
        return {...x, 'country': d?.country, 'currency_name': d?.currency_name}
      })
     
      this.issueTrans = map(issueTrans, (x: IIssueTrans) => {
        let d = this.countries.find(y => y.id == x.country);
        return {...x, 'country': d?.country, 'currency_name': d?.currency_name}
      })

      this.oaNum = map(oaNum, (x: ICountryOANum) => {
        let d = this.countries.find(y => y.id == x.country);
        return {...x, 'country': d?.country, 'currency_name': d?.currency_name}
      })
      console.log('this.allowTrans', this.allowTrans)
      
    }
    )
  }

  ngOnInit(): void {
    this.cstmFilSer.getAll()
    this.countrySer.getAll()
    this.publTranSer.getAll()
    this.oaTranSer.getAll()
    this.allowTranSer.getAll()
    this.issueTranSer.getAll()
    this.applTypeSer.getAll()
  }

  ngOnDestroy(): void {
    this.csmt$.unsubscribe()
  }
}
