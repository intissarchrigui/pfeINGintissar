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
       //item.titre.includes(appointmentValue.toLocaleLowerCase())||
       item.phone.includes(clientValue.toLocaleLowerCase())  || 
       item.first_name.includes(clientValue.toLocaleLowerCase())||
       item.last_name.includes(clientValue.toLocaleLowerCase())||
       item.email.toLocaleLowerCase().includes(clientValue.toLocaleLowerCase())
       );
    }
  }
}
toString();