/// <reference types="@types/googlemaps" />
import { Component, OnInit, TemplateRef, ViewChild,Input, ElementRef, NgZone, Output, EventEmitter, AfterViewInit, ViewChildren} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AnnonceService } from '../annonce.service';
import Annonce from '../models/annonce';
import { Message } from '../models/message';
import Swal from 'sweetalert2';
import { ImagesAnnonceService } from '../services/imagesannonce.service';
import Addresse from '../models/addresse';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { MapsAPILoader } from '@agm/core';
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
//import {} from '@types/googlemaps';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import PlaceResult = google.maps.places.PlaceResult;
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
declare var google: any;
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
  export class localite  {
    id:string;
    nom:string;
    delegation_id:string;
    }
@Component({
  selector: 'app-gestion-annonces',
  templateUrl: './gestion-annonces.component.html',
  styleUrls: ['./gestion-annonces.component.css']
})
export class GestionAnnoncesComponent implements OnInit,AfterViewInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  address: string;
  private geoCoder;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
 /*  @ViewChild('search')
  public searchElementRef: ElementRef; */

   isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  modalRef: BsModalRef;
  addressFormGroup: FormGroup;


  map: any;
  drawingManager: any;
   poly: google.maps.Polyline;
   mapp:any;

   options;
   pa;
   anonce=new Annonce

  climatisation=false;
  ascenseur=false;
  cuisine=false;
  parking=false;
  jardin=false;
  chauffage=false;
  meuble=false;

  selectedRegion:string;
   optionss:string [] = [];
   annonceValue;
  id;
  alertAddAnn:boolean=false;
  addForm:FormGroup;
  updateForm:FormGroup;

  submitted=false;
  filesToUpload:File[]= [];
  images:string [] = [];
  imagesname:string[]=[];
  annonce= Annonce;
  //addresse=new Addresse
  annonces:Annonce[];
  Status:string='Pending';
  currentAnnonce=new Annonce;
  idan:string
   //options:object
  // private types: string[] = ["à louer", "à vendre"];
   types:Types[]= [
    {value: 'à louer', viewValue: ' A louer'},
    {value: 'à vendre', viewValue: 'A vendre'}
   
  ];

  chambres:Chambres[]= [
    {value: '1 pièce', viewValue: ' 1 pièce'},
    {value: '2 pièces ', viewValue: '2 pièces'},
    {value: '3 pièces ', viewValue: '3 pièces'},
    {value: '4 pièces ', viewValue: '4 pièces'},
    {value: '5 et plus ', viewValue: '5 et plus'}
   
  ];

  salleBains:SDB[]= [
    {value: '1 pièce', viewValue: ' 1 pièce'},
    {value: '2 pièces ', viewValue: '2 pièces'},
    {value: '3 pièces ', viewValue: '3 pièces'}
   
  ];

  regions:Regions[]= [
    {value: 'ben arous', viewValue: ' Ben Arous'},
    {value: 'ariana ', viewValue: 'Ariana'},
    {value: 'tunis ', viewValue: 'Tunis'},
    {value: 'manouba ', viewValue: 'Manouba'},
/*     {value: 'beja ', viewValue: 'Béja'},
    {value: 'bizerte ', viewValue: 'Bizerte'},
    {value: 'gabes ', viewValue: 'Gabès'},
    {value: 'gafsa ', viewValue: 'Gafsa'},
    {value: 'gendouba ', viewValue: 'Gendouba'},
    {value: 'kairouan ', viewValue: 'Kairouan'},
    {value: 'kasserine ', viewValue: 'Kasserine'},
    {value: 'kebili ', viewValue: 'Kébili'},
    {value: 'kef ', viewValue: 'Kef'},
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
    {value: 'zaghouan ', viewValue: 'Zaghouan'} */
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
   type = "à louer";
   model = {
    appartement: false,
    maison: false,
    terrain: false
  
  };
  add:boolean=false;
  update:boolean=false;
  alertUpdateAnn:boolean=false;
  showModal:boolean = false;
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
    adrexacte:null,
    region:"",
    ville:"",
    rue:"",
    code_postal:"",
    longitude:"",
    latitude:"",

    } ;
  user;
  agence;
  userConnect;
  villa:ville=null;
  delegation:delegation=null;
  localite:delegation=null;
  localites:localite[]=[];
  delegations:delegation[]=[];
  Villes:ville[]=[];


  constructor(
              private _formBuilder: FormBuilder,
              private imageService: ImagesAnnonceService,
              private annonceService:AnnonceService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, 
              private router: Router,
              private modal: NgbModal,
              private modalService: BsModalService ,
              private toastr: ToastrService) { }

/*  openModal(template: TemplateRef<any>) {
    this.showModal=true;
    this.modalRef = this.modalService.show(template);
  
 } 
 */
 open()
 {  this.modal.open(this.modalContent, { size: 'lg' });

 }
 
    ngOnInit(): void {

      this.user=JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user)
    this.agence=this.user.nom_agence
       console.log( this.agence)
    this.getAllAnnonces();

    
      this.zoom = 10;
      this.latitude = 52.520008;
      this.longitude = 13.404954;
  
      this.setCurrentPosition();
      this.firstFormGroup = this._formBuilder.group({
        titre: ['', Validators.required],
        description: ['', Validators.required],
        prix: ['', Validators.required],
        type:['', Validators.required],
        superfecie: ['', Validators.required],
      });
      this.secondFormGroup = this._formBuilder.group({
        categorie: ['', Validators.required],
        etage:['', Validators.required],
        usage:['', Validators.required],
        nbre_chambres:['', Validators.required],
        pieces_salleBain:['', Validators.required],
        commodites:['', Validators.required],
  /*   chauffage:['', Validators.required],
    ascenseur:['', Validators.required],
    parking:['', Validators.required],
    meuble:['', Validators.required],
    jardin:['', Validators.required],
    cuisine:['', Validators.required], */
      });
      this.addressFormGroup  = this._formBuilder.group({
        villa:['', Validators.required],
        delegation:['', Validators.required],
        address: new FormControl(),
     
      });
      this.addressFormGroup.get('address').valueChanges.subscribe(value => console.log('value changed', value))

      this.annonceService.getVille().subscribe((res:ville[]) =>{
        console.log("ville mte3na",res)
        this.Villes=res
       // var today = new Date();
       // this.start.setDate(today.getDate()-7);
        })

    }

   ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
  
      let autocomplete = new google.maps.places.Autocomplete();
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
  }


  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.addresse.adrexacte=result.formatted_address;
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

 onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }

  refresh(){
    window.location.reload()
   // this.add==false;
   // this.update==false;
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
  

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
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

  addAnn(){
   this.add=true;
 }

 updateAnn(){
  this.update=true;
}
  selectEvent(item) {
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    // do something when input is focused
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

  get addFormControls() {
    return this.addForm.controls;
  }
  onChangeRegion(a){
    console.log("hhhhh",a)
    this.villa=a
    console.log("ville del",this.villa)
    console.log(this.villa.nom)
    this.annonceService.getDelegation(this.villa.id_ville).subscribe((res:delegation[]) =>{
      console.log("ville mte3na",res)
     
      this.delegations=res
     // var today = new Date();
     // this.start.setDate(today.getDate()-7);
      })
    }

    onChangedelegation(a){
      console.log(a)
      this.delegation=a
      console.log(this.delegation.nom)
      this.annonceService.getLocalite(this.delegation.id).subscribe((res:localite[]) =>{
        console.log("localite",res)
        this.localites=res
       // var today = new Date();
       // this.start.setDate(today.getDate()-7);
        })
      }
  
      onChangelocalite(a){
        console.log(a)
        this.localite=a
        console.log(this.localite.nom)
        }
  get updateFormControls() {
    return this.updateForm.controls;
  }
  addNewAnnonce() {
    this.submitted=true
  
/* 
    const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
    console.log("randomName",randomName) */
const annonce= new Annonce()

/* let data={
  titre:this.addForm.value.titre,
description:this.addForm.value.description,
 images:this.images,
 usage:this.addForm.value.usage,
 etage:this.addForm.value.etage,
 prix:this.addForm.value.prix,
 ville:this.addForm.value.ville,
 rue:this.addForm.value.rue,
 code_postal:this.addForm.value.code_postal,
categorie:this.addForm.value.categorie,
commodites:[this.climatisation,this.meuble,this.ascenseur,
  this.chauffage, this.jardin, this.cuisine,this.parking],
nbre_chambres:this.addForm.value.nbre_chambres,
pieces_salleBain:this.addForm.value.pieces_salleBain,
 superfecie:this.addForm.value.superfecie,
 type:this.addForm.value.type
} */

let data={
titre:this.form.titre,
description:this.form.description,
 images:this.images,
 usage:this.form.usage,
 etage:this.form.etage,
 prix:this.form.prix,
 region:this.villa.nom,
 delegation:this.delegation.nom,
// localite:this.localite.nom,
 adresse_exacte: this.addresse.adrexacte,
 //code_postal:this.addresse.code_postal,
 longitude:this.longitude ,
 latitude:this.latitude,
 categorie:this.form.categorie,
 commodites:[this.climatisation,this.meuble,this.ascenseur,
this.chauffage, this.jardin, this.cuisine,this.parking],
nbre_chambres:this.form.nbre_chambres,
pieces_salleBain:this.form.pieces_salleBain,
superfecie:this.form.superfecie,
type:this.form.type,
date_pub:new Date().toLocaleDateString(),
//id_pro: this.user._id,
professionnel:this.user._id,
favori:false,
}
   
  
 console.log("data",data)
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
//  alert('SUCCESS!! :-)\n\n' + JSON.stringify(data,null, 4));
    this.annonceService.addAnnonce(data,this.filesToUpload,this.options).
    subscribe((res:any)=>{
      console.log(this.options)
      //this.alertAddAnn=true;
      this.toastr.success('Votre annonce a été ajouté avec succés !' ,'', {
        timeOut: 10000,
        positionClass: 'toast-bottom-right',
      });
      this.ngOnInit();
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
    //  Swal.fire('votre annonce a été crée avec succés', '', 'success');
      this.add=false;
    })
 
    //this.ngOnInit()
    this.router.navigate(['/annonces']);
  }
  onChange(obj){
    obj= true
  }
getAllAnnonces(){
  this.annonceService.getAnnonces().subscribe((res:Annonce[]) =>{
  console.log("res",res)
  if(this.user.role=='Profesional'){
  this.annonces=res.filter((annonce)=>annonce.professionnel._id==this.user._id)}
  else if (this.user.role=='Admin'){
    this.annonces=res
  }
  })
} 
publishAnnonce(_id){
  this.annonceService.publishannonce(_id,{Status:'Pending'}).subscribe(res =>{
    console.log(_id)
    this.getAllAnnonces();

  })
}

refuseAnnonce(_id){
  this.annonceService.refuseannonce(_id,{Status:'Pending'}).subscribe(res =>{
    console.log(_id)
    this.getAllAnnonces();

  })
}



deleteAnnonce(_id) {
  Swal.fire({
    title: 'êtes-vous sûr?',
    text: 'Vous ne pourrez plus récuperer cela!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimez-le!',
    cancelButtonText: 'Annuler',
  }).then((result) => {
    if (result.value) {
      this.annonceService.deleteAnnonce(_id).subscribe((res: any) => {
        this.annonces = res;
        this.ngOnInit();
      });
     var arrayFromStroage = JSON.parse(localStorage.getItem("annonces"));
     console.log("arrayFromStroage",arrayFromStroage)
var arrayLength = arrayFromStroage.length;
let faveGif = arrayFromStroage.map(faveGif => faveGif._id);
if (_id==faveGif._id){
  let index = faveGif.findIndex(id => id == faveGif._id);
  console.log(index);
  // console.log("i['_id']",i['_id'])
  // let answer = localStorage.key(i);
   localStorage.removeItem(index);
 }




/*console.log("arrayLength",arrayLength)
console.log ("_id",_id)
arrayFromStroage.forEach(element => {
  console.log("element",element)
  arrayFromStroage.fi
  if (_id==element._id){
 
    localStorage.removeItem(element);
  }
});
       for (var i=0;i<=arrayLength;i++){
        if (_id==i._id){
          console.log("i['_id']",i['_id'])
          let answer = localStorage.key(i);
          localStorage.removeItem(answer);
        }
      } */
      
      //let answer = localStorage.key(3);
      //localStorage.removeItem(JSON.stringify(this.annonces.id));
      Swal.fire(
        'Supprimé',
        'Cette annonce a été supprimée avec succés',
        'success'
      );
    }
  });
}


 getAnnonceById(id) {
  this.annonceService.getAnnonce(id).subscribe((res: any) => {
    this.currentAnnonce = res;
    console.log("currentAnnonce",this.currentAnnonce);
    this.firstFormGroup.patchValue({
      _id:this.currentAnnonce._id,
    titre:this.currentAnnonce.titre,
    description:this.currentAnnonce.description,
    superfecie:this.currentAnnonce.superfecie,
    prix:this.currentAnnonce.prix,
    type:this.currentAnnonce.type,
    })
    this.secondFormGroup.patchValue({
    etage:this.currentAnnonce .etage,
    usage:this.currentAnnonce .usage,
    categorie:this.currentAnnonce .categorie,
    images:this.images,

    nbre_chambres:this.currentAnnonce.nbre_chambres,
    pieces_salleBain:this.currentAnnonce.pieces_salleBain,
    commodites:this.currentAnnonce.commodites
    })
    this.addressFormGroup.patchValue({
      villa:this.currentAnnonce.addresse.region,
      delegation:this.currentAnnonce.addresse.delegation,
      adresse_exacte:this.currentAnnonce.addresse.adresse_exacte
    });
  });
}


updateAnnonce() {
 // this.submitted=true
 // this.currentAnnonce.images=this.images,
 let data={
  titre:this.firstFormGroup.value.titre,
  description:this.firstFormGroup.value.description,
  type:this.firstFormGroup.value.type,
  prix:this.firstFormGroup.value.prix,
  superfecie:this.firstFormGroup.value.superfecie,
   images:this.images,
   usage:this.secondFormGroup.value.usage,
   etage:this.secondFormGroup.value.etage,
   region:this.villa.nom,
   delegation:this.delegation.nom,
  // localite:this.localite.nom,
   adresse_exacte: this.addresse.adrexacte,
   //code_postal:this.addresse.code_postal,
   longitude:this.longitude ,
   latitude:this.latitude,
   categorie:this.secondFormGroup.value.categorie,
   commodites:[this.climatisation,this.meuble,this.ascenseur,
  this.chauffage, this.jardin, this.cuisine,this.parking],
  nbre_chambres:this.secondFormGroup.value.nbre_chambres,
  pieces_salleBain:this.secondFormGroup.value.pieces_salleBain,

  date_pub:this.currentAnnonce.date_pub,
  //id_pro: this.user._id,
  professionnel:this.user._id,
  favori: this.currentAnnonce.favori,
  }
  this.currentAnnonce.commodites=[this.climatisation,this.meuble,this.ascenseur,
    this.chauffage, this.jardin, this.cuisine,this.parking],
  this.options=[]
  if (this.currentAnnonce.commodites[0]==true){
    //console.log(element)
    this.options.push("climatisation")
  } 
   if (this.currentAnnonce.commodites[1]==true){
   this.options.push("meuble")
 }
    if (this.currentAnnonce.commodites[2]==true){
     this.options.push("ascenseur")          
   }
   if (this.currentAnnonce.commodites[3]==true){
     this.options.push("chauffage")
     
   }
   if (this.currentAnnonce.commodites[4]==true){
     this.options.push("jardin")
     
   }
   if (this.currentAnnonce.commodites[5]==true){
     this.options.push("cuisine")
     
   }
   if (this.currentAnnonce.commodites[6]==true){
     this.options.push("parking")
     
   }

   console.log("this.options",this.options)
   // let options:object
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(data,null, 4));
    this.annonceService
    .updateAnnonce(this.currentAnnonce._id,data,this.filesToUpload,this.options)
    .subscribe(
      (response) => {
        console.log(response);
        this.toastr.success('Votre annonce a été modifié avec succés !' ,'', {
          timeOut: 10000,
          positionClass: 'toast-bottom-right',
        });
      //  this.alertUpdateAnn=true;
       // Swal.fire('Cette annonce a été modifié avec succés', '', 'success');
        this.update=false;
        this.getAllAnnonces();
       // this.modalRef.hide();
      },
      (error) => {
        console.log(error);
      }
    );
} 

}

