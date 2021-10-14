import {Country} from "./Country.model";

export interface Language {
  id: number,
  name: string,
  country: number | Country,
}
