import {Component, ElementRef, ViewChild} from '@angular/core';
import {PricingComponent} from "../../content-free/pricing/pricing.component";
import {ExampleReportComponent} from "../../content-free/example-report/example-report.component";
import {
  FeaturesDemonstrationComponent
} from "../../content-free/features-demonstration/features-demonstration.component";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  @ViewChild(PricingComponent, {read: ElementRef})
  pricingRef: ElementRef = {} as ElementRef

  @ViewChild(ExampleReportComponent, {read: ElementRef})
  exampleReportRef: ElementRef = {} as ElementRef

  @ViewChild(FeaturesDemonstrationComponent, {read: ElementRef})
  featureRef: ElementRef = {} as ElementRef

  constructor(private scroll: ViewportScroller) {
  }


  scrollPricing() {
    this.scroll.scrollToPosition([0, this.pricingRef.nativeElement.offsetTop])
  }

  scrollExampleReport() {
    this.scroll.scrollToPosition([0, this.exampleReportRef.nativeElement.offsetTop])
  }

  scrollFeatures() {
    this.scroll.scrollToPosition([0, this.featureRef.nativeElement.offsetTop])
  }
}
