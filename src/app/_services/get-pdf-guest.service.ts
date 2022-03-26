import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as fileSaver from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class GetPdfGuestService {

  url = environment.API_URL + 'fam-est-detail-guest-pdf/';
  private subscript: Subscription = new Subscription()

  constructor(private http: HttpClient) {
  }

  getAndDownload(udn: number) {
    let options = {
      responseType: 'blob' as const,
      observe: 'response' as const
    }
    this.subscript = this.http.get(this.url+udn, options).subscribe(x => {
      let content_disposition = x.headers.get('content-disposition')
      let filename = 'default'
      if (content_disposition !== undefined && content_disposition !== null) {
        let string_arr = content_disposition.split(';')
        let file = string_arr.find(y => y.includes('filename='))
        filename = file?.split('=')[1]!
      }
      fileSaver.saveAs(x.body!, filename)
    })
  }

  ngOnDestroy() {
    this.subscript.unsubscribe()
  }
}
