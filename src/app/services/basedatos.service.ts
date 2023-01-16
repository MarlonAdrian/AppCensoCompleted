// import { Injectable } from '@angular/core';

// //import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
// //import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BasedatosService {
  

//   constructor() { }

  
//   // getCollection(){
//   //   this.firestore.collection('Users').get().subscribe((res)=>{});
//   // }

// }

import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  nombre: string;
  apellido: string;
  cedula: number;
  familia: number;
  latitud:any;
  longitud: any;
  //result:Photo;
  // title: string;
  // text: string;
}

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {

  constructor(private firestore: Firestore) { }

  // Leer collection
  getNotes(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'UsuarioDatos');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note> {
    const noteDocRef = doc(this.firestore, `UsuarioDatos/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }


  // Añadir una collection
  addNote(note: Note) {
    console.log("llega aqui al servicio");
    const notesRef = collection(this.firestore, 'UsuarioDatos');
    return addDoc(notesRef, note);
  }

  deleteNote(note: Note) {
    const noteDocRef = doc(this.firestore, `UsuarioDatos/${note.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(note: Note) {
    const noteDocRef = doc(this.firestore, `UsuarioDatos/${note.id}`);
    return updateDoc(noteDocRef, { nombre: note.nombre, apellido: note.apellido, cedula: note.cedula, familia: note.familia, latitud: note.latitud, longitud: note.longitud});
  }
}
