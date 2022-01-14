import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stepper-buttons-next',
  templateUrl: './stepper-buttons-next.component.html',
  styleUrls: ['./stepper-buttons-next.component.scss']
})
export class StepperButtonsNextComponent implements OnInit {
  @Input() stepper: any
  constructor() { }

  ngOnInit(): void {
  }

}
