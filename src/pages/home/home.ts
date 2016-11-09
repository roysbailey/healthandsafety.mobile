import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IncidentDetailPage } from '../incidentDetail/incidentDetail'
import  _ from 'lodash';

import { incidentsAPI } from '../../shared/shared';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  allIncidents: any[];
  incidents: any[];
  submittedFilter = 'approvals';

  constructor(public navCtrl: NavController, public incidentsAPI: incidentsAPI) {

  }

ionViewDidLoad() {
  console.log('ViewDidLoad');
  this.incidentsAPI.getIncidents().subscribe(data => {
    this.allIncidents = data;
    console.log('all incidents from http load:', this.allIncidents); 
    this.filterSubmitted();
    });
  }


  refreshAll(refresher) {
    this.incidentsAPI.getIncidents(true).subscribe(data => {
      this.allIncidents = data;
      refresher.complete();
      console.log('Refreshed data: ' + data);
      this.ionViewDidLoad();
      });
  }


  filterSubmitted(){
    if(this.submittedFilter === 'all'){
      this.incidents = _.chain(this.allIncidents)
        .orderBy(['Region', 'createdDateTime'], ['desc','desc'])
        .map(i => {
          return this.dtoToVM(i);
        })
        .value();
    } else {
      this.incidents = _.chain(this.allIncidents)
        .filter(i => i.status === 'Submitted' || i.status === 'Pending')
        .orderBy(['Region', 'createdDateTime'], ['desc','desc'])
        .map(i => {
          return this.dtoToVM(i);
        })
        .value();

        console.log('this.allIncidents from filter: ' + this.allIncidents);
        console.log('this.incidents from filter: ' + this.incidents);
    }
  }

  approve(incident) {
    console.log('Approved incident: '+ incident.IncidentID);
    let incidentModel = this.allIncidents.find(i => i.IncidentID === incident.IncidentID);
    incidentModel.status = 'Approved';
    this.incidentsAPI.updateIncident(incidentModel)
      .subscribe( () =>{
        incidentModel.status = 'Pending';
        this.ionViewDidLoad();
      });
  }

  itemTapped($event, incident){
    console.log("About to navigate: " + incident.IncidentID);
    this.navCtrl.push(IncidentDetailPage, incident); 
  }

  getHeader(record, recordIndex, records) {
    console.log('Record: ' + record);
    if (recordIndex === 0 || record.Region !== records[recordIndex-1].Region) {
      return longRegionText(record.Region);
    }
    return null;  
  }  

  private dtoToVM(incidentDTO){
    let vm = {
      IncidentID: incidentDTO.IncidentID,
      casualty: incidentDTO.casualty, 
      Region: this.shortRegionText(incidentDTO.Region),
      incidentDate: incidentDTO.incidentDate,
      incidentClass: this.shortClassText(incidentDTO.incidentClass), 
      status: incidentDTO.status,
      problemReport: incidentDTO.problemReport,
      nameOfSubmitter: incidentDTO.nameOfSubmitter,
      createdDateTime: this.convertDateToEngland(incidentDTO.createdDateTime)
    }

    return vm;
  }

  private shortRegionText(regionText){
    let text = regionText;
    switch(regionText.toLowerCase()) {
      case 'rest of world':
        text = 'ROW';
        break;
      case 'germany':
        text = 'GER';
        break;
    }

    return text;
  }

  private shortClassText(longClassText){
    let shortText = longClassText;
    switch(longClassText.toLowerCase()) {
      case 'minor injury':
        shortText = 'Minor';
        break;
      case 'major incident':
        shortText = 'Major';
        break;
    }

    return shortText;
  }

  private convertDateToEngland(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(inputFormat);
      return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
  }  
  
}

  function longRegionText(regionText){
    let text = regionText;
    switch(regionText.toUpperCase()) {
      case 'ROW':
        text = 'Rest of World';
        break;
      case 'GER':
        text = 'Germany';
        break;
      case 'UK':
        text = 'United Kingdom';
        break;
      case 'PJOBS':
        text = 'Cyprus, Falklands, Gibraltar, Ascension Islands';
        break;
    }

    return text;
  }