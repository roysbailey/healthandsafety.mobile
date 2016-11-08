import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { IncidentDetailPage } from '../pages/incidentDetail/incidentDetail';
import { TabsPage } from '../pages/tabs/tabs';
import { incidentsAPI, Config } from '../shared/shared';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    IncidentDetailPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
