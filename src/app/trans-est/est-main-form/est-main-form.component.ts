import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/characteristics/_models/Country.model';
import { CountryService } from 'src/app/characteristics/_services/country.service';
import { IAllowEstTemp } from '../_models/AllowEstTemp.model';
import { IFileEstTemp } from '../_models/FileEstTemp.model';
import { IIssueEstTemp } from '../_models/IssueEstTemp.model';
import { IOAEstTemp } from '../_models/OAEstTemp.model';
import { IPublEstTemp } from '../_models/PublEstTemp.model';
import { AllowEstTempService } from '../_services/allow-est-temp.service';
import { FileEstTempService } from '../_services/file-est-temp.service';
import { IssueEstTempService } from '../_services/issue-est-temp.service';
import { OaEstTempService } from '../_services/oa-est-temp.service';
import { PublEstTempService } from '../_services/publ-est-temp.service';

@Component({
  selector: 'app-est-main-form',
  templateUrl: './est-main-form.component.html',
  styleUrls: ['./est-main-form.component.scss']
})
export class EstMainFormComponent implements OnInit {

  public countries: Country[] = [new Country(0, '', '')]
  //public applTypes: ApplType[] = [new ApplType()]
  public filEstTemp = new Array<IFileEstTemp>()
  public publEstTemp = new Array<IPublEstTemp>()
  public oaEstTemp = new Array<IOAEstTemp>()
  public allowEstTemp = new Array<IAllowEstTemp>()
  public issueEstTemp = new Array<IIssueEstTemp>()

  constructor(
    private countrySer: CountryService,
    private filEstSer: FileEstTempService,
    private publEstSer: PublEstTempService,
    private oaEstSer: OaEstTempService,
    private allowEstSer: AllowEstTempService,
    private issueEstSer: IssueEstTempService,
  ) { 
    

  }

  ngOnInit(): void {
  }

}
