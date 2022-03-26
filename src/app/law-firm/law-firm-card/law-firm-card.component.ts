import {Component, Input, OnInit} from '@angular/core';
import {LawFirm} from "../../_models/law-firm.model";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-law-firm-card',
  templateUrl: './law-firm-card.component.html',
  styleUrls: ['./law-firm-card.component.scss']
})
export class LawFirmCardComponent implements OnInit {

  @Input() lawFirm: LawFirm = new LawFirm()
  public image_url: string = ''
  constructor() { }

  ngOnInit(): void {
    this.image_url = environment.API_URL+'get-law-firm-image/'+this.lawFirm.image_location
  }

}
