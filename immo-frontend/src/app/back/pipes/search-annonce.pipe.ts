import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchAnnonce'
})
export class SearchAnnoncePipe implements PipeTransform {
  transform(value: any, annonceValue: any): any {
   // if(!value) return [];
    if (annonceValue == null) {
      return value;
    } else {
      return value.filter( (item) =>
       item.titre.includes(annonceValue.toLocaleLowerCase())||
       item.description.toLocaleLowerCase().includes(annonceValue.toLocaleLowerCase())  || 
       item.categorie.toLocaleLowerCase().includes(annonceValue.toLocaleLowerCase())||
       item.addresse.ville.toLocaleLowerCase().includes(annonceValue.toLocaleLowerCase())||
       item.prix.toString().includes(annonceValue)|| 
       item.superfecie.toString().includes(annonceValue)  
       );
    }
  }
}
toString();
