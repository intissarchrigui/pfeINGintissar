import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchClient'
})
export class SearchClientPipe implements PipeTransform {
  transform(value: any, clientValue: any): any {
   // if(!value) return [];
    if (clientValue == null) {
      return value;
    } else {
      return value.filter( (item) =>
       item.client.first_name.toLocaleLowerCase().includes(clientValue.toLocaleLowerCase())||
       item.client.last_name.toLocaleLowerCase().includes(clientValue.toLocaleLowerCase())
       );
    }
  }
}
toString();

