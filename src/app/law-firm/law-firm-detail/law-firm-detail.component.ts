import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LawFirmService} from "../../_services/law-firm.service";
import {LawFirm} from "../../_models/law-firm.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-law-firm-detail',
  templateUrl: './law-firm-detail.component.html',
  styleUrls: ['./law-firm-detail.component.scss']
})
export class LawFirmDetailComponent implements OnInit {
  public lawFirm: LawFirm = new LawFirm()
  private destroy: Subject<void> = new Subject<void>()
  public image_url: string = ''

  constructor(private router: Router,
              private lawFirmSer: LawFirmService,
              private route: ActivatedRoute) {
    let nameslug = this.route.snapshot.paramMap.get('nameslug')
    this.lawFirmSer.getWithQuery('nameslug=' + nameslug)
      .pipe(takeUntil(this.destroy)).subscribe(x => {
          this.lawFirm = x[0]
          let id = x[0].image_location
          this.image_url = environment.API_URL+'get-law-firm-image/'+this.lawFirm.image_location
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }


}
