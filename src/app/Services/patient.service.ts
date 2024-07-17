import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IPatient } from '../api/IPatient.model';



@Injectable({
  providedIn: 'root'
})
export class PatientService {
apiUrl ="https://localhost:44386/api/Patient/"
http = inject(HttpClient)
  constructor() { }
  getAllPatient() {
    // debugger
    return this.http.get<IPatient[]>(this.apiUrl);
  }
  createPatient(Patient: IPatient): Observable<any> {
    return this.http.post(this.apiUrl, Patient);
  }
  getPatient(PatientId: number) {
    return this.http.get<IPatient>(this.apiUrl + PatientId);
  }
  updatePatient( Patient:IPatient):Observable<any> {
    console.log(Patient)
    return this.http.put<IPatient>(this.apiUrl , Patient);
  }


  deletePatient(PatientId: number) {
    return this.http.delete(this.apiUrl + PatientId);
  }
}
