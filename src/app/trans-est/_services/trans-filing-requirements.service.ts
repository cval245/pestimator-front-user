import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ITransFilReq} from "../_models/TransFilReq.model";


@Injectable({
  providedIn: 'root'
})
export class TransFilingRequirementsService {

  baseUrl = environment.API_URL
  private url = this.baseUrl + 'get-filing-transform-requirements'
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<ITransFilReq[]>(this.url)
  }
}
