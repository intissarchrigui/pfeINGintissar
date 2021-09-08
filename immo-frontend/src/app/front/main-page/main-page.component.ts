import { Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,FormControl} from '@angular/forms';
import { AnnonceService } from 'app/back/annonce.service';
import Annonce from 'app/back/models/annonce';
import { FilterAnnonceDto } from '../_models/filterAnnonceDto';
import Swal from 'sweetalert2';
import {ToastrService} from 'ngx-toastr';
import * as io  from 'socket.io-client';
//import {io} from 'socket.io-client/build/index';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
//import {} from '@types/googlemaps';
import { MapLoaderService } from './map.loader';
import PlaceResult = google.maps.places.PlaceResult;
import { MapsAPILoader } from '@agm/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import Client from '../_models/client';

declare var google: any;
export class ville  {
  _id:string;
  id_ville:string;
  nom:string;
  }
  export class delegation  {
    id:string;
    nom:string;
    ville_id:string;
    }
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  @ViewChild('multiSelect') multiSelect;
  dropdownList:any= [
    { id: 1, text: 'Appartement' },
    { id: 2, text: 'Maison' },
    { id: 3, text: 'Terrain' }
  ];
  selectedItems:any = [

  ];
dropdownSettings:IDropdownSettings= {
  singleSelection: false,
  idField: 'item_id',
  textField: 'item_text',
  enableCheckAll: true,
  selectAllText: 'Chọn All',
  unSelectAllText: 'Hủy chọn',
  allowSearchFilter: true,
  limitSelection: -1,
  clearSearchFilter: true,
  maxHeight: 197,
  itemsShowLimit: 3,
  searchPlaceholderText: 'Tìm kiếm',
  noDataAvailablePlaceholderText: 'Không có dữ liệu',
  closeDropDownOnSelection: false,
  showSelectedItemsAtTop: false,
  defaultOpen: false
  };
 
  public selectedAddress: PlaceResult;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
];
prix:number;
region:string;
 categories: string[] = ["maison", "appartement","terrain"];
 chambres: string[] = ["1 piece", "2 pieces","3 pieces"];
 bains:string[] = ["1 pièce", "2 pièces"];
categoriee = "Catégorie";


public latitude: number=33.892166;
public longitude: number= 9.561555;
public zoom: number= 8;
type1="à louer";
type2="à vendre";
selectedOption;
filteredAnnonce:[]=[];
addressefilteredAnnonce:[]=[];
selectedCity: any;
map:any;
annonces:Annonce[];
annoncesLouer:Annonce[];
annoncesVendre:Annonce[];
favannonces: Annonce[]= [];
annon:Annonce[]=[new Annonce()];
filtreFormTout:FormGroup;
filtreFormLouer:FormGroup;
filtreFormVendre:FormGroup;
changeSubmit:boolean=false;
filterAnnonce= new FilterAnnonceDto();
selectedCategorie:string;
selectedChambre:string;
selectedBain:string;
model = {
  appartement: false,
  maison: false,
  terrain: false
};

drawingManager: any;
poly: google.maps.Polyline;
adrexacte:string;
modelType = {
  tout:false,
  louer: false,
  vendre: false
};

options;
addresseExacte;
climatisation=false;
ascenseur=false;
cuisine=false;
parking=false;
jardin=false;
chauffage=false;
meuble=false;
commodites:boolean[];
disableRechAv:boolean=false;

user:Client;
marker;
public data:any;
socket:any;
long;
lat;
favori:boolean=false;
lastAnnonces:boolean=false;
defaultValue:'';
nombreAnnonces:number;
Villes:ville[]=[];
delegations:delegation[]=[];
villa:ville=null;
delegation:delegation=null;
alertAddFav:boolean=false;
alertDeleteFav:boolean=false;
  constructor( private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private modal: NgbModal,private toastr: ToastrService,
     private annonceService:AnnonceService, private _formBuilder: FormBuilder,private authService:AuthService,private router: Router )
      { 
        if (sessionStorage.getItem('user') === null) {
          this.user===null
          console.log("No user connect")
        }else{
       
          this.user = JSON.parse(sessionStorage.getItem('user'));
        console.log(this.user)
      }
        let isLoggedIn = this.authService.isLoggedIn();

        if (isLoggedIn) {
          this.router.navigate(['/']);
        }
    }

  ngOnInit(): void {

    this.filtreFormTout = this._formBuilder.group({
      addresse: ['', Validators.required],
      categorie: [null, Validators.required],
      prixMin: [null, Validators.required],
      prixMax: [null, Validators.required],
      superfecie:[null, Validators.required],
      nbre_chambres:['', Validators.required],
      pieces_salleBain: ['', Validators.required],
      commodites: [null, Validators.required],
      climatisation:['', Validators.required],
      meuble:['', Validators.required],
      ascenseur:['', Validators.required],
      jardin:['', Validators.required],
      chauffage:['', Validators.required],
      cuisine:['', Validators.required],
      parking:['', Validators.required],
    });
    
    this.filtreFormLouer = this._formBuilder.group({
      addresse: ['', Validators.required],
      categorie: [null, Validators.required],
      prixMin: [null, Validators.required],
      prixMax: [null, Validators.required],
      superfecie:[null, Validators.required],
      nbre_chambres:['', Validators.required],
      pieces_salleBain: ['', Validators.required],
      commodites: [null, Validators.required],
      climatisation:['', Validators.required],
      meuble:['', Validators.required],
      ascenseur:['', Validators.required],
      jardin:['', Validators.required],
      chauffage:['', Validators.required],
      cuisine:['', Validators.required],
      parking:['', Validators.required],
    });
    
    this.filtreFormVendre= this._formBuilder.group({
      addresse: ['', Validators.required],
      categorie: [null, Validators.required],
      prixMin: [null, Validators.required],
      prixMax: [null, Validators.required],
      superfecie:[null, Validators.required],
      nbre_chambres:['', Validators.required],
      pieces_salleBain: ['', Validators.required],
      commodites: [null, Validators.required],
      climatisation:['', Validators.required],
      meuble:['', Validators.required],
      ascenseur:['', Validators.required],
      jardin:['', Validators.required],
      chauffage:['', Validators.required],
      cuisine:['', Validators.required],
      parking:['', Validators.required],
    });
    this.getAllAnnonces();
    this.annonceService.getVille().subscribe((res:ville[]) =>{
      console.log("ville mte3na",res)
      this.Villes=res
   
      });
   

  /*   this.nombreAnnonces= this.annonces.length
    console.log(this.nombreAnnonces) */
  

  }
    
  get f() { return this.filtreFormLouer.controls; }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  AjouterFavoris(id){
    console.log("id",id)
     this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user)
    console.log(this.user._id)
    const data={
      
      client:this.user._id,
      annonce:id
      }
      
    this.annonceService.AjoutFavoris(data).subscribe(res =>{
      this.getAllAnnonces()
      this.toastr.success('Cette annonce a été ajouté au Favoris avec succés !');
      //Swal.fire('Cette annonce a été ajouté au Favoris avec succés', '', 'success');
      console.log("favoris ajouté")
      console.log("user"+this.user._id)
      //this.favori=true;
    },
    (err) => { 
    //  this.toastr.warning('Cette annonce a été ajouté au Favoris avec succés !');
 /*       Swal.fire({
      icon: 'error',
      title: 'oops...',
      text: 'vous avez déjà ajouté cette annonce aux favoris !',
    }); */
  }
    )
  }


  deleteFavoris(_id){
   
    
        this.annonceService.deleteFavoris(_id).subscribe((res: any) => {
          this.favannonces = res;
          this.getAllAnnonces()
        });
        this.alertDeleteFav=true;
       this.toastr.warning('Cette annonce a été supprimée du favoris avec succés !');
 /*     Swal.fire(
          'Supprimé',
          'Cette favoris a été supprimée avec succés',
          'success'
        ); */
   
  }
 
  onChange(obj){
    obj= true
  }
  // showSuccess(eventName: any) {
  //   this.toastr.success(eventName , 'Nouvel évenement !',{ timeOut: 20000,extendedTimeOut: 2000000000} );
  // }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.adrexacte=result.formatted_address;
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

 onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }

 
  onChangeCategorie($event){
  this.selectedCategorie=$event.target.value
  console.log(this.selectedCategorie)
  }

  onChangeChambre($event){
    this.selectedChambre=$event.target.value
    console.log(this.selectedCategorie)
    }
    onChangeBain($event){
      this.selectedBain=$event.target.value
      console.log(this.selectedCategorie)
      }
  getOptions(){
 
    if(this.selectedCategorie==null){
      Swal.fire(
        //'Supprimé',
        'Veuillez sélectionner une catégorie pour utiliser la recherche avancée ',
        //'error'
      );
      this.disableRechAv=false
    }
    else {
    this.disableRechAv=true
    {if(this.selectedCategorie=="appartement"){
      this.model.appartement=true;
      this.model.maison=false;
      this.model.terrain=false;
    }
    else if(this.selectedCategorie=="maison"){
      this.model.appartement=false;
      this.model.maison=true;
      this.model.terrain=false;
    }
    else if(this.selectedCategorie=="terrain"){
      this.model.appartement=false;
      this.model.maison=false;
      this.model.terrain=true;
    } 
   }}
    console.log(this.selectedCategorie)
 
  }

  choiceTout(){
    this.modelType.tout=true;
    this.modelType.louer=false;
    this.modelType.vendre=false;
   
  }
  choiceLouer(){
    this.modelType.louer=true;
    this.modelType.vendre=false;
    this.modelType.tout=false;
  }


  choiceVendre(){
    this.modelType.louer=false;
    this.modelType.vendre=true;
    this.modelType.tout=false;
  }
  get addFormControls() {
    return this.filtreFormLouer.controls;
  }

   submitFilterTout(){
    this.commodites=[this.climatisation,this.meuble,this.ascenseur,
      this.chauffage, this.jardin, this.cuisine,this.parking],
    this.options=[]
    if (this.commodites[0]==true){
      this.options.push("climatisation")
    
    } 
     if (this.commodites[1]==true){
     this.options.push("meuble")
   }
      if (this.commodites[2]==true){
       this.options.push("ascenseur")          
     }
     if (this.commodites[3]==true){
       this.options.push("chauffage")
       
     }
     if (this.commodites[4]==true){
       this.options.push("jardin")
       
     }
     if (this.commodites[5]==true){
       this.options.push("cuisine")
       
     }
     if (this.commodites[6]==true){
       this.options.push("parking")
       
     }
     console.log("this.options",this.options)

   this.filterAnnonce.addresse=this.adrexacte,
    this.filterAnnonce.categorie=this.filtreFormTout.value.categorie,
    this.filterAnnonce.prixMin=this.filtreFormTout.value.prixMin,
    this.filterAnnonce.prixMax=this.filtreFormTout.value.prixMax,
    this.filterAnnonce.commodites=this.options,
    this.filterAnnonce.superfecie=this.filtreFormTout.value.superfecie,
    this.filterAnnonce.nbre_chambres=this.filtreFormTout.value.nbre_chambres,
    this.filterAnnonce.pieces_salleBain=this.filtreFormTout.value.pieces_salleBain,
    this.changeSubmit=true


  
    this.annonceService.filterAnnonce(this.filterAnnonce).subscribe((resfilter:any)=>{
      console.log("resfilter",resfilter)
      this.filteredAnnonce=resfilter.data;
    })
  } 
 
  submitFilterLouer(){
    this.commodites=[this.climatisation,this.meuble,this.ascenseur,
      this.chauffage, this.jardin, this.cuisine,this.parking],
    this.options=[]
    if (this.commodites[0]==true){
      //console.log(element)
      this.options.push("climatisation")
    
    } 
     if (this.commodites[1]==true){
     this.options.push("meuble")
   }
      if (this.commodites[2]==true){
       this.options.push("ascenseur")          
     }
     if (this.commodites[3]==true){
       this.options.push("chauffage")
       
     }
     if (this.commodites[4]==true){
       this.options.push("jardin")
       
     }
     if (this.commodites[5]==true){
       this.options.push("cuisine")
       
     }
     if (this.commodites[6]==true){
       this.options.push("parking")
       
     }
     console.log("this.options",this.options)

    this.filterAnnonce.addresse=this.filtreFormLouer.value.addresse,
    this.filterAnnonce.categorie=this.filtreFormLouer.value.categorie,
    this.filterAnnonce.prixMin=this.filtreFormLouer.value.prixMin,
    this.filterAnnonce.prixMax=this.filtreFormLouer.value.prixMax,
   this.filterAnnonce.type=this.type1,
    this.filterAnnonce.commodites=this.options,
    this.filterAnnonce.superfecie=this.filtreFormLouer.value.superfecie,
    this.filterAnnonce.nbre_chambres=this.filtreFormLouer.value.nbre_chambres,
    this.filterAnnonce.pieces_salleBain=this.filtreFormLouer.value.pieces_salleBain,
    this.changeSubmit=true

console.log("this.filterAnnonce",this.filterAnnonce)
  
    this.annonceService.filterAnnonce(this.filterAnnonce).subscribe((resfilter:any)=>{
      console.log("resfilter",resfilter)
      this.filteredAnnonce=resfilter.data;
     // console.log(resfilter.statusCode)
      this.nombreAnnonces= this.filteredAnnonce.length
    console.log(this.nombreAnnonces)
    this.filteredAnnonce.forEach(element=>
      {
      console.log(element['annonceAddresse'])
///let dd=[]

var obj = {
  length: 0,

  ajoutElem: function ajoutElem (element) {
      // obj.length est automatiquement incrémenté
      // quand on ajoute un élément
      [].push.call(this, element);
  }
};
console.log("obj",obj)

      this.addressefilteredAnnonce.push(element['annonceAddresse'])

  
 // console.log(this.addressefilteredAnnonce[1])
 let dd=[]
 dd.push(this.addressefilteredAnnonce)
 console.log(dd)
    
 //console.log("data",data)

/* let data={
  logitude:this.addressefilteredAnnonce[0].longitude
} */
console.log(this.addressefilteredAnnonce)
      }
      )

this.addressefilteredAnnonce.forEach(element=>{
  console.log(element['latitude'])
})

      },
  /*   (err) => {  Swal.fire({
      icon: 'error',
      title: 'oops...',
      text: 'aucune annonce correspondante à votre recherche !',
    });} */
    )
  }
 
  submitFilterVendre(){
    this.commodites=[this.climatisation,this.meuble,this.ascenseur,
      this.chauffage, this.jardin, this.cuisine,this.parking],
    this.options=[]
    if (this.commodites[0]==true){
      //console.log(element)
      this.options.push("climatisation")
    
    } 
     if (this.commodites[1]==true){
     this.options.push("meuble")
   }
      if (this.commodites[2]==true){
       this.options.push("ascenseur")          
     }
     if (this.commodites[3]==true){
       this.options.push("chauffage")
       
     }
     if (this.commodites[4]==true){
       this.options.push("jardin")
       
     }
     if (this.commodites[5]==true){
       this.options.push("cuisine")
       
     }
     if (this.commodites[6]==true){
       this.options.push("parking")
       
     }
     console.log("this.options",this.options)

    this.filterAnnonce.addresse=this.filtreFormLouer.value.addresse,
    this.filterAnnonce.categorie=this.filtreFormVendre.value.categorie,
    this.filterAnnonce.prixMin=this.filtreFormVendre.value.prixMin,
    this.filterAnnonce.prixMax=this.filtreFormVendre.value.prixMax,
    this.filterAnnonce.type=this.type2,
    this.filterAnnonce.commodites=this.options,
    this.filterAnnonce.superfecie=this.filtreFormVendre.value.superfecie,
    this.filterAnnonce.nbre_chambres=this.filtreFormVendre.value.nbre_chambres,
    this.filterAnnonce.pieces_salleBain=this.filtreFormVendre.value.pieces_salleBain,
    this.changeSubmit=true


    console.log("this.filterAnnonce",this.filterAnnonce)
    this.annonceService.filterAnnonce(this.filterAnnonce).subscribe((resfilter:any)=>{
      console.log("resfilter",resfilter)
      this.filteredAnnonce=resfilter.data;
      this.nombreAnnonces= this.filteredAnnonce.length
    console.log(this.nombreAnnonces)
      })
    }
/*     (err) => {  Swal.fire({
      icon: 'error',
      title: 'oops...',
      text: 'aucune annonce correspondante à votre recherche !',
    });} */

 

getAllAnnonces(){
 // this.lastAnnonces=true
 // this.favori==false
  this.annonceService.getAnnonces().subscribe((res:Annonce[]) =>{
  console.log("res",res)
/*   console.log("res",res)
  var date = new Date();
  var endDate=date.toLocaleDateString()
  console.log(endDate);
  date.setMonth(date.getMonth() - 3);
  var startDate=date.toLocaleDateString()
  console.log(startDate); */
  this.annonces=res.filter((annonce)=>annonce.Status=='Accepted');
  //localStorage.setItem('annonces', JSON. stringify(this.annonces))
  })
}

open()
{  this.modal.open(this.modalContent, { size: 'xl' });
google.maps.event.trigger(this.map, "resize");
//this.refresh.next();
}

favoris(){
  this.favori=true;
 // console.log(this.favori)
 this.user = JSON.parse(sessionStorage.getItem('user'));
 console.log(this.user)
 this.annonceService.AnnonceFavoris(this.user._id).subscribe((res:Annonce[]) =>{
  console.log("res",res)
 this.favannonces=res
 console.log("favoris",this.favannonces)


  })
}

openDetails(_id){
console.log(_id)
    window.open('http://localhost:4200/details-annonces/'+_id)
    //console.log("false")


}
/* initMap(){

  this.annon.map(element => {
    console.log(element)

 
      this.marker++
      var coords=new google.maps.LatLng(element.addresse.latitude, element.addresse.longitude)
      //console.log(coords) 
      this.long=element.addresse.longitude
      this.lat=element.addresse.latitude
      console.log( this.long) 
      console.log( this.lat) 
     this.marker= new google.maps.Marker({
          position: {
              lat: element.addresse.latitude,
              lng: element.addresse.longitude
          },
          map: this.map,
          clickable: true,
        // icon:{ url:"../../../../assets/assets/imgUnsplash/black-circle.png"},
    
      });
     
 
  

  
  

  
  

});

  } */



}
