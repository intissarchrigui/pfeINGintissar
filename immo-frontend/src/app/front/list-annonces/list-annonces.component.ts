import { Component, Input, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,FormControl} from '@angular/forms';
import { AnnonceService } from 'app/back/annonce.service';
import Annonce from 'app/back/models/annonce';
import { ImagesAnnonceService } from 'app/back/services/imagesannonce.service';
import { FilterAnnonceDto } from '../_models/filterAnnonceDto';
import {ToastrService} from 'ngx-toastr';
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
  selector: 'app-list-annonces',
  templateUrl: './list-annonces.component.html',
  styleUrls: ['./list-annonces.component.scss']
})
export class ListAnnoncesComponent implements OnInit {
  annonces:Annonce[];
  pgn;
  choix = '';
  filtreFormLouer:FormGroup;
filtreFormVendre:FormGroup;
selectedCategorie:string;
selectedChambre:string;
selectedBain:string;
options;
addresseExacte;
climatisation=false;
ascenseur=false;
cuisine=false;
parking=false;
jardin=false;
chauffage=false;
meuble=false;
nombreAnnonces:number;
favannonces: Annonce[]= [];
filterAnnonce= new FilterAnnonceDto();
filteredAnnonce:[]=[];
changeSubmit:boolean=false;
commodites:boolean[];
type1="à louer";
type2="à vendre";
prix:number;
region:string;
 categories: string[] = ["maison", "appartement","terrain"];
 chambres: string[] = ["1 piece", "2 pieces","3 pieces"];
 bains:string[] = ["1 pièce", "2 pièces"];
categoriee = "Catégorie";
Villes:ville[]=[];
delegations:delegation[]=[];
villa:ville=null;
user;
delegation:delegation=null;
  @Input() filterAnnonceDto: FilterAnnonceDto[];
  constructor(
    private formBuilder: FormBuilder,
    private imageService: ImagesAnnonceService,
    private annonceService:AnnonceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllAnnonces()
    this.filtreFormLouer = this.formBuilder.group({
      addresse: [null, Validators.required],
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
    
    this.filtreFormVendre= this.formBuilder.group({
      addresse: [null, Validators.required],
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
    this.annonceService.getVille().subscribe((res:ville[]) =>{
      console.log("ville mte3na",res)
      this.Villes=res
   
      });
  }


  getAllAnnonces(){
    this.annonceService.getAnnonces().subscribe((res:Annonce[]) =>{
    console.log("res",res)
    this.annonces=res.filter((annonce)=>annonce.Status=='Accepted');
    })
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
louer() {
  this.choix = 'louer';
}

vendre() {
  this.choix = 'vendre';
}

openDetails(_id){
  console.log(_id)
      window.open('http://localhost:4200/details-annonces/'+_id)
      //console.log("false")
  
  
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

  }
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
      //  this.alertDeleteFav=true;
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
}