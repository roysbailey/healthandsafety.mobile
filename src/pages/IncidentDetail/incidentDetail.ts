import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-Incident-details',
  templateUrl: 'IncidentDetail.html'
})

export class IncidentDetailPage {
  incidentDetail: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.incidentDetail = navParams.data;
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
