import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAppointment'
})
export class SearchAppointmentPipe implements PipeTransform {

  transform(value: any, appointmentValue: any): any {
    // if(!value) return [];
     if (appointmentValue == null) {
       return value;
     } else {
       return value.filter( (item) =>
        //item.titre.includes(appointmentValue.toLocaleLowerCase())||
        item.agence.toLocaleLowerCase().includes(appointmentValue.toLocaleLowerCase())  || 
        item.start.toString().includes(appointmentValue.toLocaleLowerCase())||
        item.client.first_name.toLocaleLowerCase().includes(appointmentValue.toLocaleLowerCase())||
        item.client.last_name.toLocaleLowerCase().includes(appointmentValue.toLocaleLowerCase())||
        item.client.email.toLocaleLowerCase().includes(appointmentValue.toLocaleLowerCase())
        );
     }
   }
  

}
toString();