import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private  platform: Platform) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(()=>{
      this.router.navigateByUrl('splash');
    })
  }  
}


