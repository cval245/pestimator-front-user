import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {LawFirm} from "../_models/law-firm.model";

@Injectable({
  providedIn: 'root'
})
export class LawfirmImageUploadService {

  private url: string = environment.API_URL + 'post-law-firm-image/'

  constructor(private http: HttpClient) {
  }
  post(file: any, lawFirm: LawFirm){
    let full_url = this.url + lawFirm.id
    let file_form = new FormData()
    file_form.append("file", file)
    return this.http.post(full_url, file_form)
  }
}
