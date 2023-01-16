

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';

import { Geolocation } from '@capacitor/geolocation';
import { BasedatosService } from '../services/basedatos.service';


// MOD1
import { ChangeDetectorRef } from '@angular/core';
import { ModalPage } from '../modal/modal.page';
import { Note } from '../services/basedatos.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  // MOD2
  notes: Note[] = [];
  newNote: Note[] = [];

  nombre = '';
  apellido = '';
  cedula;
  familia;
  imagen: Photo;
  

  

  profile = null;
  latitud:any;
  longitud: any;
  coords: any;

//   constructor(private dataService: BasedatosService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
//     this.dataService.getNotes().subscribe(res => {
//       this.notes = res;
//       this.cd.detectChanges();
//       console.log('datos ->', res);
//     });
//   }

  constructor(
    // MOD3
    private dataService: BasedatosService,
    private cd: ChangeDetectorRef,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,



    private avatarService: AvatarService,
    public firestore: BasedatosService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modal:ModalController,
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    }), // iMPORTANTE, TERMINA EN ;
    this.dataService.getNotes().subscribe(res => {
     
      this.newNote = res;
      // this.cd.detectChanges();
      console.log('datosssss ->', res);
      console.log('datosssss array', this.newNote);
    });

    // Funcion ubicacion
    this.locate();
    console.log("latitud: ", this.latitud, "longitud: ", this.longitud);

  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async changeImage() {
    this.imagen = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (this.imagen) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(this.imagen);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }

  async locate(){
    console.log("si entra a locate");
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitud=coordinates.coords.latitude;
    this.longitud=coordinates.coords.longitude;
  }


 

  // mod3
  // async addNote() {
  //   console.log("llega aqui")
  //   handler: res => {
  //     console.log("informacion", res)
  //     this.dataService.addNote({ text: res.text, title: res.title });
  //   }
  // }

  // addNuevo(){
    
  //   console.log("llega aquixcvxcvxv", this.newNote);
  //   console.log("usuario", this.nombre);
  //   this.dataService.addNote({ nombre: this.nombre, apellido: this.apellido, cedula: this.cedula, familia: this.familia, latitud: this.latitud, longitud: this.longitud, result: this.imagen });
    
  // }

  async addNote() {
    console.log("Lllega al la funcion");
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'nombre',
          placeholder: 'Nombre',
          type: 'text'
        },
        {
          name: 'apellido',
          placeholder: 'Apellido',
          type: 'text'
        },
        {
          name: 'cedula',
          placeholder: 'Cedula',
          type: 'text'
        },
        {
          name: 'familia',
          placeholder: 'Familia',
          type: 'text'
        }
      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.dataService.addNote({
              nombre: res.nombre, apellido: res.apellido, cedula: res.cedula, familia: res.familia,
    
              latitud: this.latitud,
              longitud: this.longitud
            });
            
          }
        }
      ]
    });

    await alert.present();
  }

 

  
  async openNote(newNote: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: newNote.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

}
