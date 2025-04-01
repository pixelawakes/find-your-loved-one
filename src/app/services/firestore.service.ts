import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {}

  getMissingPersons(): Observable<any[]> {
    const missingPersonsRef = collection(this.firestore, 'missingPersons');
    return collectionData(missingPersonsRef);
  }

  addMissingPerson(person: any): Promise<any> {
    const missingPersonsRef = collection(this.firestore, 'missingPersons');
    return addDoc(missingPersonsRef, person);
  }
}
