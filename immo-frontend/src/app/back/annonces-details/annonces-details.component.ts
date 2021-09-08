import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnnonceService } from '../annonce.service';
import Annonce from '../models/annonce';
import { MapLoaderService } from '../maps/maps/map.loader';
@Component({
  selector: 'app-annonces-details',
  templateUrl: './annonces-details.component.html',
  styleUrls: ['./annonces-details.component.css']
})
export class AnnoncesDetailsComponent implements OnInit {
  currentPage: string = "About";
  id_Annnonce;
  currentAnnonce:Annonce;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  constructor( private annonceService:AnnonceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_Annnonce = this.route.snapshot.paramMap.get('annonceId');
    this.getAnnonceById(this.id_Annnonce);


    this.zoom = 10;
    this.latitude = this.currentAnnonce.addresse.latitude;
    this.longitude = this.currentAnnonce.addresse.longitude;
  }

  showPage(page: string) {
    this.currentPage = page;
}
getAnnonceById(id) {
  this.annonceService.getAnnonce(id).subscribe((res: any) => {
    this.currentAnnonce = res;
    console.log(this.currentAnnonce);
 
  });
}


ngAfterViewInit() {
  //this.getAnnonceById(id);
  MapLoaderService.load().then(() => {
  
    this.initMap();
 
  })
}
initMap(){
  const uluru = { lat: this.currentAnnonce.addresse.latitude, lng:this.currentAnnonce.addresse.longitude };
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 10,
      center: uluru,
    }
  );
  
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
  }

  }
