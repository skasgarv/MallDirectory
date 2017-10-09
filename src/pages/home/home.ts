import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public navParams: NavParams) {}

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let latLng = new google.maps.LatLng(latitude, longitude);
 
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
 
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.startNavigating();
    });

  }

  startNavigating(){
 
        let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer;
 
        directionsDisplay.setMap(this.map);

        directionsService.route({
            origin: '315 Red Apple Ct, Central Valley, NY 10917',
            destination: this.navParams.get("address"),
            travelMode: google.maps.TravelMode['WALKING']
        }, (res, status) => {
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
            } else {
                console.warn(status);
            }
        });
   }
}
