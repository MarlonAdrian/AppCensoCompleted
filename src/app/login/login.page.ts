import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.showAlert('Registro exitoso', 'Acceda a su cuenta');
    } else {
      this.showAlert('Registro fallido', 'Por favor intentalo de nuevo!');
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.showAlert('Inicio de sesión fallido', 'Poir favor intentalo de nuevo!');
    }
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}












// import { ChangeDetectorRef, Component } from '@angular/core';
// import { AlertController, ModalController } from '@ionic/angular';

// import { ModalPage } from '../modal/modal.page';
// import { BasedatosService, Note } from '../services/basedatos.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: 'login.page.html'
//   //styleUrls: ['home.page.scss']
// })
// export class LoginPage {
//   notes: Note[] = [];

//   constructor(private dataService: BasedatosService,  private cd: ChangeDetectorRef, private alertCtrl: AlertController, private modalCtrl: ModalController) {
//     this.dataService.getNotes().subscribe(res => {
//       this.notes = res;
//       this.cd.detectChanges();
//       console.log('datos ->', res);
//     });
//   }

//   async addNote() {
//     const alert = await this.alertCtrl.create({
//       header: 'Add Note',
//       inputs: [
//         {
//           name: 'title',
//           placeholder: 'My cool note',
//           type: 'text'
//         },
//         {
//           name: 'text',
//           placeholder: 'Learn Ionic',
//           type: 'textarea'
//         }
//       ],
//       buttons: [
//         {
//           text: 'Cancel',
//           role: 'cancel'
//         }, {
//           text: 'Add',
//           handler: res => {
//             this.dataService.addNote({ text: res.text, title: res.title });
//           }
//         }
//       ]
//     });

//     await alert.present();
//   }

//   // Enseñar notas en pantalla

//   async openNote(note: Note) {
//     const modal = await this.modalCtrl.create({
//       component: ModalPage,
//       componentProps: { id: note.id },
//       breakpoints: [0, 0.5, 0.8],
//       initialBreakpoint: 0.8
//     });

//     await modal.present();
//   }
// }


