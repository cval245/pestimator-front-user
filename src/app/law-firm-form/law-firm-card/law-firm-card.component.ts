import {Component, Input, OnInit} from '@angular/core';
import {LawFirm} from "../../_models/law-firm.model";

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
    this.image_url = this.lawFirm.image_location
  }

}
