import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPro'
})
export class SearchProfesionalPipe implements PipeTransform {
  transform(value: any, proValue: any): any {
   // if(!value) return [];
    if (proValue == null) {
      return value;
    } else {
      return value.filter( (item) =>
       //item.titre.includes(appointmentValue.toLocaleLowerCase())||
       item.phone.includes(proValue.toLocaleLowerCase())  || 
       item.first_name.includes(proValue.toLocaleLowerCase())||
       item.last_name.includes(proValue.toLocaleLowerCase())||
       item.nom_agence.includes(proValue.toLocaleLowerCase())||
       item.email.includes(proValue.toLocaleLowerCase())
       );
    }
  }
}
toString();