import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {Platform} from "@angular/cdk/platform";

@Injectable({
  providedIn: 'root'
})
export class PlatformIdService {

  constructor(@Inject(PLATFORM_ID) private platformId: Platform) {
  }
}
