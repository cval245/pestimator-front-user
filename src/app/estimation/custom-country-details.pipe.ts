import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'customCountryDetails'
})
export class CustomCountryDetailsPipe implements PipeTransform {

  transform(value:any): any{
    let keys = [];
    for (let key in value){
      if (value[key] !== null && value[key] !== undefined) {
        console.log('key', key, 'value[key]', value[key])
        keys.push({key: key, value: value[key]});
      }
    }
    console.log('keys', keys)
    return keys;
  }

}
