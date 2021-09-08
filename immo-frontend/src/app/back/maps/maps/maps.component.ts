import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit, Output ,EventEmitter} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { MapLoaderService } from './map.loader';
import { AnnonceService } from 'app/back/annonce.service';
import Annonce from 'app/back/models/annonce';
import { data } from 'app/shared/data/smart-data-table';
import { element } from 'protractor';
declare var google: any;
import Swal from 'sweetalert2';
import PlaceResult = google.maps.places.PlaceResult;
import {Location, Appearance, GermanAddress} from '@angular-material-extensions/google-maps-autocomplete';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
   Open:boolean=true;
   map: any;
   marker;
   btn;
   trace:boolean=false;
  annonces:Annonce[]=[];
  annon:Annonce[]=[];
  drawingManager: any;
   poly: google.maps.Polyline;
   mapp:any;
   paths = [
    { lat: 0, lng: 10 },
    { lat: 0, lng: 20 },
    { lat: 10, lng: 20 },
    { lat: 10, lng: 10 },
    { lat: 0, lng: 10 }
    ]
  //title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  public selectedAddress: PlaceResult;
  product:any
  markers = [];
  annoncesMap:Annonce[]=[];
  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private annonceService:AnnonceService
  ) { }
  
 // @Output() buttonEvent = new EventEmitter();

 @Output() clickbuttonEvent = new EventEmitter<Object>();
  ngOnInit() {
    this.getAllAnnonces();
     this.annon=JSON.parse(localStorage.getItem('annonces'));
    //this.user=JSON.parse(sessionStorage.getItem('user'));
    console.log(this.annon)
 /*   this.mapsAPILoader.load().then(() => {
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
    }); */
  }
 
  //sendEvent(){
    //this.clickbuttonEvent.emit(this.Open=true)
   // alert('hello')
  //}




  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

 onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }
   setCurrentLocation() {
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

  
  ngAfterViewInit() {
    this.getAllAnnonces();
    MapLoaderService.load().then(() => {
    
      this.drawPolygon(this.annon);
     // google.maps.event.addDomListener(window, 'load',this.drawPolygon);
    })
  }
 

  getAllAnnonces(){
    this.annonceService.getAnnonces().subscribe((res:Annonce[]=[]) =>{
    console.log("res",res)
    this.annonces=res
   // return this.annonces
    })
  } 

  sendEvent(element:Annonce){
    console.log(element)
    element.Open=true
    this.clickbuttonEvent.emit(element)
}


hideAllInfoWindows(map) {
  this.markers.forEach(function(marker) {
    marker.infowindow.close(this.map, marker);
 }); 
}

  drawPolygon(annon :Annonce[]) {
    const mapDiv = document.getElementById("map") as HTMLElement;
    this.map = new google.maps.Map(mapDiv, {
      center: { lat: 33.892166, lng: 9.561555 },
      zoom: 8
    });

  var polyOptions = {
      fillColor: '#0099FF',
      fillOpacity: 0.7,
      strokeColor: '#AA2143',
      strokeWeight: 2,
      editable: true
  };


  // Creates a drawing manager attached to the map that allows the user to draw Polygons
  this.drawingManager = new google.maps.drawing.DrawingManager({
       drawingMode:google.maps.drawing.OverlayType.POLYGON,
      drawingControlOptions: {
          drawingModes: [
              google.maps.drawing.OverlayType.POLYGON
          ]
      },
      polygonOptions: polyOptions,
      map: this.map
  });
  google.maps.Polygon.prototype.Contains = function(point) {
      var crossings = 0,
          path = this.getPath();
          
      // for each edge
      for (var i = 0; i < path.getLength(); i++) {
          var a = path.getAt(i),
              j = i + 1;
          if (j >= path.getLength()) {
              j = 0;
          }
          var b = path.getAt(j);
          if (rayCrossesSegment(point, a, b)) {
              crossings++;
          }
      }

      // odd number of crossings?
      return (crossings % 2 == 1);

      function rayCrossesSegment(point, a, b) { 
          var px = point.lng(),
              py = point.lat(),
              ax = a.lng(),
              ay = a.lat(),
              bx = b.lng(),
              by = b.lat();
          if (ay > by) {
              ax = b.lng();
              ay = b.lat();
              bx = a.lng();
              by = a.lat();
          }
          // alter longitude to cater for 180 degree crossings
          if (px < 0) {
              px += 360;
          }
          if (ax < 0) {
              ax += 360;
          }
          if (bx < 0) {
              bx += 360;
          }

          if (py == ay || py == by) py += 0.00000001;
          if ((py > by || py < ay) || (px > Math.max(ax, bx))) return false;
          if (px < Math.min(ax, bx)) return true;

          var red = (ax != bx) ? ((by - ay) / (bx - ax)) : Infinity;
          var blue = (ax != px) ? ((py - ay) / (px - ax)) : Infinity;
          return (blue >= red);

      }

  };


  var currentInfoWindow = null;
  //this.annon.map(element => {
    this.annonceService.getAnnonces().subscribe((res:Annonce[]) =>{
    console.log("resMapAnn",res)
 
//this.annoncesMap=res
res.map(element => {
  console.log("i",element)
  //console.log(this.annoncesMap[i].addresse.latitude)
    var contentWindow =  
    ' <h6 style="color:#00BFFF">'+element.categorie+'</h6>' +         
                ' <img  src="http://localhost:3000/annonce/getFile/'+element.fileimages[0]+'"'+
                'style="height: 50px;width:100px paddingLeft:10% ;marginRight=10% "/>'+
            '<h6>'+element.prix+' TND</h6>' + 
               // '<a class="btn btn-primary" id="btn" onclick="sendEvent()" >details</a>'
                '  <button type="button" class="btn btn-outline-warning mr-1" id ="clickableItem">Détails</button>'
                //href=" /details-annonces/'+element._id+'"
    //this.annonces.push(this.Open)
    var infoWindow = new google.maps.InfoWindow({
      content: contentWindow
    });

    google.maps.event.addListener(infoWindow, 'domready', () => {
      //now my elements are ready for dom manipulation
      var clickableItem = document.getElementById('clickableItem');
      console.log(clickableItem)
      clickableItem.addEventListener('click', () => {
     this.sendEvent(element)
     console.log("hello")
      });
    });

 
  google.maps.event.addListener(this.drawingManager, 'polygoncomplete', function(polygon) {
    console.log("i",element)
    var lat=element.addresse.latitude
    var lng=element.addresse.longitude
      var coords=new google.maps.LatLng(lat,lng)
      console.log(coords)  
     // const infoWindow = new google.maps.InfoWindow(infoWindowOptions);
     //  infowindow.open(this.map, marker);
      if (polygon.Contains(coords)) {
        let data =[]
        var mark:number =0
    const marker= new google.maps.Marker({
          position: {
              lat: element.addresse.latitude,
              lng: element.addresse.longitude
          },
         // id: counter,
          map: this.map,
          clickable: true,
         //icon:{ url:"../../../../assets/assets/imgUnsplash/black-circle.png"},
    
      });
     marker.metadata = {type: "point", id:element._id };
     data.push(  marker.metadata .id )
     if (data.length==0){
      Swal.fire({
        icon: 'error',
        title: 'oops...',
        text: 'aucune annonce correspondante à votre recherche !',
      });
     }
     // this.markers.push(marker);
      console.log(this.markers)
    //  alert('YES');
     //infoWindow.open(this.map, marker);
    
      marker.addListener('click', () => {
        if (currentInfoWindow != null) {
          currentInfoWindow.close();
          }
          infoWindow.open(this.map, marker);
          currentInfoWindow = infoWindow;
       // this.hideAllInfoWindows(this.map);
        infoWindow.open(this.map, marker);
  
        });
    
     /*     var infoWindowOptions = {
            content: 
                '<br/><img src="../../../../assets/assets/imgUnsplash/circle-red" width="100px" />'
        };
        
        const  infoWindow = new google.maps.InfoWindow(infoWindowOptions);
        //infoWindow= infowindow.open();
        google.maps.event.addDomListener(mapDiv, "click", () => {
          window.alert("Map was clicked!");
          infowindow.open()
        }); */
         // google.maps.event.addDomListener(window, 'load', this.drawPolygon);
       
      /*   
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(this.map, marker);
        }); */
        mark++
      } else {
         // alert('NO');
     console.log("no")
      }
     
     if (data.length=0){
      Swal.fire({
        icon: 'error',
        title: 'oops...',
        text: 'aucune annonce correspondante à votre recherche !',
      });
     }
      
   
// Create title field and submit button

//infowindow.open(this.map, this.marker);

    });
  

  
  


  })  });





 


}

}
  
  
  
      


