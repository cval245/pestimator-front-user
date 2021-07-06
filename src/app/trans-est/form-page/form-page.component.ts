import { Component, OnInit } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { ICustomFilTrans } from '../_models/CustomFilTrans.model';
import { CustomFilTransService } from '../_services/custom-fil-trans.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit {

  private csmt$: Subscription = new Subscription
  //private cmbSub: Subscription = new Subscription
  public cstmFilTrans = new Array<ICustomFilTrans>()

  constructor(private cstmFilSer: CustomFilTransService
    ) {
    this.csmt$ = this.cstmFilSer.getAll().subscribe(x =>
      this.cstmFilTrans = x
    )
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.csmt$.unsubscribe()
  }
}
