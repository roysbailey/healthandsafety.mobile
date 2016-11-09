import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

declare var window: any;

@Component({
  selector: 'page-Incident-details',
  templateUrl: 'IncidentDetail.html'
})

export class IncidentDetailPage {
  incidentDetail: any;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.incidentDetail = navParams.data;

    let location = this.getIncidentLatLong(this.incidentDetail); 

    this.map = {
      lat: location.lat,
      lng: location.long,
      zoom: 12,
      markerLabel: this.incidentDetail.Region 
    };      
  }

  ionViewDidLoad(){

  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`; 
  }

  private getIncidentLatLong(incident) {
    let location = {
      lat: 52.559615,
      long: -1.786338
    };

    switch(incident.Region) {
      case "UK":
        location.lat = 52.559615;
        location.long = -1.786338;
        break;

      case "ROW":
        location.lat = 36.526386;
        location.long = -116.883405;
        break;

      case "PJOBS":
        location.lat = -7.962696;
        location.long = -14.405716;
        break;
      
      default:
        location.lat = 48.129231;
        location.long = 11.573763;
        break;
    }
    return location;
  }

  statusColour() {
      let colour = 'primary';
      switch (this.incidentDetail.status.toLowerCase()) {
          case "submitted":
            colour = 'danger';
            break;

          case "approved":
            colour = 'secondary';
            break;
      }
    return colour;      
  }

}
