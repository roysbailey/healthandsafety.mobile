import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

import {Config} from './config';

@Injectable()
export /**
 * incidentsAPI - this is out API for the mobile app calling back to our REST service.
 */
class incidentsAPI {

    private incidents: any[];

   constructor(private http: Http, private config: Config) {
        
    }

    getIncidents(force = false) : Observable<any> {
        if (force || !this.incidents) {
            console.log('**about to make getIncidents HTTP call');
            return this.http.get(`${this.config.settings().baseUrl}/api/hasincidents`)
                .map(response => {
                    this.incidents = response.json();
                    console.log('Got data: ' + this.incidents);
                    return this.incidents;
                });
        } else {
            return Observable.of(this.incidents);
        }
    }

    updateIncident(incidentModel) {
        let bodyString  = JSON.stringify(incidentModel);
        let headers     = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options     = new RequestOptions({ headers: headers }); // Create a request option

        let putUrl = `${this.config.settings().baseUrl}/api/hasincidents/${incidentModel.IncidentID}`;
        console.log('**about to make updateIncident HTTP call: ' + putUrl);
        return this.http.put(putUrl, bodyString, options)
            .map(response => {
                console.log('Update response: ' + response);
                return;
            });
    }

    // private incidentsLocal = [
    //     {
    //     IncidentID: 100,
    //     Region: 'UK',
    //     incidentDate: '2016-11-05',
    //     casualty: 'Guy Fawkes',
    //     incidentClass: 'Fatality',
    //     nameOfSubmitter: 'Arthur Adkins',
    //     problemReport: 'Fell off the gallows and broke his neck!',
    //     status: 'Submitted',
    //     createdDateTime: '2016-12-02',
    //     updatedDateTime: ''
    //     },
    //     {
    //     IncidentID: 121,
    //     Region: 'UK',
    //     incidentDate: '2017-03-11',
    //     casualty: 'Brian Cox',
    //     incidentClass: 'Fatality',
    //     nameOfSubmitter: 'Mr J R Hartley',
    //     problemReport: 'Fell into a black hole!',
    //     status: 'Submitted',
    //     createdDateTime: '2017-10-12',
    //     updatedDateTime: ''
    //     },
    //     {
    //     IncidentID: 122,
    //     Region: 'PJOBS',
    //     incidentDate: '2016-07-11',
    //     casualty: 'Chris Thompson',
    //     incidentClass: 'Minor Injury',
    //     nameOfSubmitter: 'Mr Bobbins',
    //     problemReport: 'Sun burn on his head',
    //     status: 'Approved',
    //     createdDateTime: '2016-08-11',
    //     updatedDateTime: ''
    //     }
        
    // ]    
}