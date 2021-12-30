import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customCountryDetails'
})
export class CustomCountryDetailsPipe implements PipeTransform {

  transform(value:any): any{
    let keys = [];
    for (let key in value){
      if (value[key] !== null && value[key] !== undefined) {
        keys.push({key: key, value: value[key]});
      }
    }
    return keys;
  }

}
