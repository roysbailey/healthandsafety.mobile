// Great article on getting maps working with ionic.  Out the box, it fails when you run on device.
// Workaround and explanation here: https://forum.ionicframework.com/t/angular2-google-maps-in-ionic-2/65736 and code for that here: https://github.com/modularcoder/ionic2-angular2-google-maps-example/commit/e94819ee17df7bb959c20e10075f207603a7dbd3

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { IncidentDetailPage } from '../pages/incidentDetail/incidentDetail';
import { TabsPage } from '../pages/tabs/tabs';
import { incidentsAPI, Config } from '../shared/shared';
import { AgmCoreModule } from 'angular2-google-maps/esm/core/index.js';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    IncidentDetailPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    IncidentDetailPage,
    TabsPage
  ],
  providers: [
    incidentsAPI,
    Config
    ]
})
export class AppModule {}
