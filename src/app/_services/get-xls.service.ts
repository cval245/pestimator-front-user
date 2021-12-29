import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import * as fileSaver from "file-saver";
import {Family} from "../_models/family.model";
import {Subscription} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetXLSService {

  url = environment.API_URL + 'get-excel-report/';

  private subscript: Subscription = new Subscription()

  constructor(private http: HttpClient) {
  }

  getAndDownload(family: Family) {
    let options = {
      params: new HttpParams().set('familyUDN', family.unique_display_no!),
      responseType: 'blob' as const,
      observe: 'response' as const
    }
    this.subscript = this.http.get(this.url, options).subscribe(x => {
     let content_disposition = x.headers.get('content-disposition')
     let filename = 'default'
     if (content_disposition !== undefined && content_disposition !== null){
       let string_arr = content_disposition.split(';')
       let file=string_arr.find(y => y.includes('filename='))
       filename = file?.split('=')[1]!
     }
     fileSaver.saveAs(x.body!, filename)
   })
  }
  ngOnDestroy(){
    this.subscript.unsubscribe()
  }
 }

