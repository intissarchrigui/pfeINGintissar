import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import Profesionnel from '../_models/Profesionnel';
import { Role } from '../_models/role';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
//import {} from '@types/googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import Annonce from 'app/back/models/annonce';
import { AnnonceService } from 'app/back/annonce.service';

interface Types {
  value: string;
  viewValue: string;
}

interface Chambres {
  value: string;
  viewValue: string;
}

interface SDB {
  value: string;
  viewValue: string;
}
interface Regions {
  value: string;
  viewValue: string;
}
interface Villes {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-creation-annonce',
  templateUrl: './creation-annonce.component.html',
  styleUrls: ['./creation-annonce.component.css']
})
export class CreationAnnonceComponent implements OnInit {
 // public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

add:boolean=false;
  map: any;
  drawingManager: any;
   poly: google.maps.Polyline;
   mapp:any;
  //title: string = 'AGM project';
 /*  latitude: number;
  longitude: number;
  zoom: number; */
  address: string;
  private geoCoder;
  annonceValue;
  @ViewChild('search')
  public searchElementRef: ElementRef;

   isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  modalRef: BsModalRef;
  addressFormGroup: FormGroup;
  form ={
    titre:"",
    description:"",
    categorie:"",
  //  images:string[];
 //   fileimages:string[];
 //   Status:"",
    etage:"",
    usage:"",
    prix:null,
    superfecie:null,
    nbre_chambres:null,
    pieces_salleBain:null,
    addresse:null,
    type:""
  } ;
  addresse ={
  region:"",
  ville:"",
  rue:"",
  code_postal:"",
  longitude:"",
  latitude:""
  } ;


  climatisation=false;
  ascenseur=false;
  cuisine=false;
  parking=false;
  jardin=false;
  chauffage=false;
  meuble=false;
  annonces;
  selectedRegion:string;

  filesToUpload:File[]= [];
  images:string [] = [];
  imagesname:string[]=[];

  types:Types[]= [
    {value: 'à louer', viewValue: ' A louer'},
    {value: 'à vendre', viewValue: 'A vendre'}
   
  ];

  chambres:Chambres[]= [
    {value: '1 pièce', viewValue: ' 1 pièce'},
    {value: '2 pièces ', viewValue: '2 pièces'},
    {value: '3 pièces ', viewValue: '3 pièces'}
   
  ];

  salleBains:SDB[]= [
    {value: '1 pièce', viewValue: ' 1 pièce'},
    {value: '2 pièces ', viewValue: '2 pièces'},
    {value: '3 pièces ', viewValue: '3 pièces'}
   
  ];

  regions:Regions[]= [
    {value: 'ben arous', viewValue: ' Ben Arous'},
    {value: 'ariana ', viewValue: 'Ariana'},
    {value: 'beja ', viewValue: 'Béja'},
    {value: 'bizerte ', viewValue: 'Bizerte'},
    {value: 'gabes ', viewValue: 'Gabès'},
    {value: 'gafsa ', viewValue: 'Gafsa'},
    {value: 'gendouba ', viewValue: 'Gendouba'},
    {value: 'kairouan ', viewValue: 'Kairouan'},
    {value: 'kasserine ', viewValue: 'Kasserine'},
    {value: 'kebili ', viewValue: 'Kébili'},
    {value: 'kef ', viewValue: 'Kef'},
    {value: 'manouba ', viewValue: 'Manouba'},
    {value: 'mahdia ', viewValue: 'Mahdia'},
    {value: 'Medenine ', viewValue: 'Médenine'},
    {value: 'monastir ', viewValue: 'Monastir'},
    {value: 'nabeul ', viewValue: 'Nabeul'},
    {value: 'sfax ', viewValue: 'Sfax'},
    {value: 'sidi bouzid ', viewValue: 'Sidi Bouzid'},
    {value: 'siliana ', viewValue: 'Siliana'},
    {value: 'sousse ', viewValue: 'Sousse'},
    {value: 'tataouine ', viewValue: 'Tataouine'},
    {value: 'tozeur ', viewValue: 'Tozeur'},
    {value: 'tunis ', viewValue: 'Tunis'},
    {value: 'zaghouan ', viewValue: 'Zaghouan'}
  ];
  villesBenArous:Villes[]= [
    {value: 'borj cedria', viewValue: 'Borj Cedria '},
    {value: 'boumhel ', viewValue: 'Boumhel'},
    {value: 'elmourouj ', viewValue: 'El Mourouj'},
    {value: 'ezzahra ', viewValue: 'Ezzahra'},
    {value: 'fouchana ', viewValue: 'Fouchana'},
    {value: 'hammam chott ', viewValue: 'Hamma chott'},
    {value: 'hammam lif ', viewValue: 'Hammam Lif'}, 
    {value: 'mouhamedia ', viewValue: 'Mouhamedia'},
    {value: 'medina jedida ', viewValue: 'Medina Jedida'},
    {value: 'megrine ', viewValue: 'Mégrine'},
    {value: 'mornag  ', viewValue: 'Mornag'}, 
    {value: 'rades  ', viewValue: 'Radès'},
  ];
  villesAriana:Villes[]= [
    {value: 'ariana ville', viewValue: 'Ariana Ville '},
    {value: 'ettadhamen ', viewValue: 'Ettadhamen'},
    {value: 'kalaat el andalous ', viewValue: 'Kalaat El Andalous'},
    {value: 'la soukra ', viewValue: 'La Soukra'},
    {value: 'sidi thabet ', viewValue: 'Sidi Thabet'},
    {value: 'borj louzir ', viewValue: 'Borj Louzir'},
    {value: 'chotrana ', viewValue: 'Chotrana'}, 
    {value: 'ennasr ', viewValue: 'Ennasr'},
    {value: 'ghazela ', viewValue: 'Ghazela'},
    {value: 'jardin manzah ', viewValue: 'Jardin D`El Manzah'},
    {value: 'menzah  ', viewValue: 'Menzah'}, 
    {value: 'manar  ', viewValue: 'Manar'},
  ];
  villesManouba:Villes[]= [
    {value: 'borj el amri', viewValue: 'Borj El Amri '},
    {value: 'djedaida ', viewValue: 'Djedeida'},
    {value: 'douar hicher ', viewValue: 'Douar Hicher'},
    {value: 'el battan ', viewValue: 'El Battan'},
    {value: 'mournaguia ', viewValue: 'Mournaguia'},
    {value: 'oued ellil ', viewValue: 'Oued Ellil'},
    {value: 'tebourba ', viewValue: 'Tebourba'}, 
    {value: 'manouba ville ', viewValue: 'Manouba Ville'},
    {value: 'denden ', viewValue: 'Denden'},
    {value: 'ksar said ', viewValue: 'Ksar Said'},
  ];
  villesTunis:Villes[]= [
    {value: 'carthage ', viewValue: 'Carthage '},
    {value: 'cite khadra ', viewValue: 'Cité El Khadra'},
    {value: 'djebel jelloud ', viewValue: 'Djebel Jelloud'},
    {value: 'el kabaria ', viewValue: 'El Kabaria'},
    {value: ' el omrane  ', viewValue: 'El Omrane'},
    {value: 'el omrane sup ', viewValue: 'El Omrane Supérieur '},
    {value: 'elouardia ', viewValue: 'El Ouardia'}, 
    {value: 'ettahrir ', viewValue: 'Ettahrir'},
    {value: 'ezzouhour ', viewValue: 'Ezzouhour'},
    {value: 'hrairia ', viewValue: 'Hrairia '},
    {value: 'la goulette ', viewValue: 'La goulette'},
    {value: 'la marssa ', viewValue: 'La Marssa'},
    {value: 'le bardo ', viewValue: 'Le Bardo'},
    {value: ' le kram  ', viewValue: 'Le Kram'},
    {value: 'medina ', viewValue: 'Médina '},
    {value: 'sejoum ', viewValue: 'Séjoum'}, 
    {value: 'sidi el bechir ', viewValue: 'Sidi El Béchir'},
    {value: 'sidi hassine ', viewValue: 'Sidi Hassine'},
    {value: ' agba  ', viewValue: 'Agba'},
    {value: 'ain zaghouan ', viewValue: 'Ain zaghouan '},
    {value: 'centre urbain nord ', viewValue: 'Centre Urbain Nord'}, 
    {value: 'lafayette ', viewValue: 'Centre Ville-Lafayet'},
    {value: 'cite olympique ', viewValue: 'Cité Olympique'},
    {value: 'ghammart ', viewValue: 'Ghammart'}, 
    {value: 'jardin de carthage ', viewValue: 'Jardin de Carthage'},
    {value: 'laouina ', viewValue: 'L`aouina'},
    {value: 'lac ', viewValue: 'Les Berges Du Lac'}, 
    {value: 'mutuelleville ', viewValue: 'mutuelleville'},
    {value: 'sidi bou said ', viewValue: 'Sidi Bou Said'},
    {value: 'sidi daoud ', viewValue: 'Sidi Daoud'},
  
  ];
  villesBeja:Villes[]= [
    {value: 'amdoun', viewValue: 'Amdoun '},
    {value: 'beja nord ', viewValue: 'Béja Nord'},
    {value: 'beja sud ', viewValue: 'Béja Sud'},
    {value: 'goubellat ', viewValue: 'Goubellat'},
    {value: 'medjez el bab ', viewValue: 'Medjez el-Bab'},
    {value: 'nefza ', viewValue: 'Nefza'},
    {value: 'teboursouk ', viewValue: 'Teboursouk'}, 
    {value: 'testour ', viewValue: 'Testour'},
    {value: 'thibar ', viewValue: 'Thibar'},
  ];
  villesBizerte:Villes[]= [
    {value: 'bizerte nord', viewValue: 'Bizerte Nord '},
    {value: 'bizerte sud ', viewValue: 'Bizerte Sud'},
    {value: 'djoumime', viewValue: 'Djoumime'},
    {value: 'el alia ', viewValue: 'El Alia'},
    {value: 'medjez el bab ', viewValue: 'Medjez el-Bab'},
    {value: 'ghar el melh ', viewValue: 'Ghar El Melh'},
    {value: 'menzel bourguiba ', viewValue: 'Menzel Bourguiba'}, 
    {value: 'menzel jemil ', viewValue: 'Menzel Jemil'},
    {value: 'ras jebal ', viewValue: 'Ras Jebal'},
    {value: 'sejenane ', viewValue: 'Sejenane'},
    {value: 'tinja ', viewValue: 'Tinja'}, 
    {value: 'utique ', viewValue: 'Utique'},
    {value: 'zarzouna ', viewValue: 'Zarzouna'},
  ];
  model = {
    appartement: false,
    maison: false,
    terrain: false
  
  };
  user;
  pa;
  options;
 constructor(private _formBuilder: FormBuilder,
    private modalService: BsModalService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private annonceService:AnnonceService) { }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 } 
  ngOnInit(): void {
    this.user=JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user)
    this.getAllAnnonces();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
  
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
  
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();
    this.firstFormGroup = this._formBuilder.group({
      titre: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.addressFormGroup = new FormGroup({
      address: new FormControl(),
    });
    this.addressFormGroup.get('address').valueChanges.subscribe(value => console.log('value changed', value))
  }

  ajoutAnnonce(){
    this.add=true
  }
  getAllAnnonces(){
    this.annonceService.getAnnonces().subscribe((res:Annonce[]) =>{
    console.log("res",res)
    this.annonces=res
    })
  } 
  getAppartementOptions(){
    this.model.appartement=true;
      this.model.maison=false;
      this.model.terrain=false;
  }
  getMaisonOptions(){
    this.model.appartement=false;
      this.model.maison=true;
      this.model.terrain=false;
  }
  getTerrainOptions(){
    this.model.appartement=false;
      this.model.maison=false;
      this.model.terrain=true;
  }

  onChangeRegion($event){
    this.selectedRegion=$event.value
    console.log(this.selectedRegion)
    }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  recuperFile(file){
    //this.filesToUpload = (file.target.files as Array<File>);
    //this.images = file.target.files[0].images;
    this.images=[];
    this.filesToUpload=[];
    for (var i = 0; i < file.target.files.length; i++) { 
      this.images.push(file.target.files[i].name);
      this.filesToUpload.push(file.target.files[i])
      console.log(this.images)
      //this.imagesname=file.target.files[i].name
      //console.log(this.imagesname)
  }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    console.log('addresse ', result.vicinity);
  }

   onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  } 

 onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  } 

  
  get addFormControls() {
    return this.firstFormGroup.controls;
  } 

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
  
    });
  }

  addNewAnnonce() {
 
  
/* 
    const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
    console.log("randomName",randomName) */
const annonce= new Annonce()

let data={
  titre:this.form.titre,
description:this.form.description,
 images:this.images,
 usage:this.form.usage,
 etage:this.form.etage,
 prix:this.form.prix,
 region:this.addresse.region,
 ville:this.addresse.ville,
 rue:this.addresse.rue,
 code_postal:this.addresse.code_postal,
 longitude:this.longitude ,
 latitude:this.latitude,
categorie:this.form.categorie,
commodites:[this.climatisation,this.meuble,this.ascenseur,
  this.chauffage, this.jardin, this.cuisine,this.parking],
nbre_chambres:this.form.nbre_chambres,
pieces_salleBain:this.form.pieces_salleBain,
 superfecie:this.form.superfecie,
 type:this.form.type
}
       
 
       this.options=[]
         if (data.commodites[0]==true){
           //console.log(element)
           this.options.push("climatisation")
         
         } 
          if (data.commodites[1]==true){
          this.options.push("meuble")
        }
           if (data.commodites[2]==true){
            this.options.push("ascenseur")          
          }
          if (data.commodites[3]==true){
            this.options.push("chauffage")
            
          }
          if (data.commodites[4]==true){
            this.options.push("jardin")
            
          }
          if (data.commodites[5]==true){
            this.options.push("cuisine")
            
          }
          if (data.commodites[6]==true){
            this.options.push("parking")
            
          }
          console.log("this.options",this.options)
  // let options:object
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(data,null, 4));
    this.annonceService.addAnnonce(data,this.filesToUpload,this.options).
    subscribe((res:any)=>{
      console.log(this.options)
      //console.log(res._id)
     
      //this.imageService.pushFileToStorage(this.filesToUpload,annonce,this.options).subscribe((rest:any) => {
      //  console.log(this.images)

        //console.log(this.filesToUpload)
      //console.log(res.id)

    /*     this.annonceService.addImage(res.id,rest.id ).subscribe(val=>{
          console.log(rest.id)

        }) */ 
      // })
      
      // this.modalRef.hide();
      // this.getAllAnnonces();
    })
  }

}
