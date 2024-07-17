import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDisease } from '../api/IDisease.model';



@Injectable({
  providedIn: 'root'
})
export class DiseaseService {
apiUrl ="https://localhost:44386/api/Disease/"
http = inject(HttpClient)
  constructor() { }
  getAllDisease() {
    // debugger
    return this.http.get<IDisease[]>(this.apiUrl);
  }
  createDisease(Disease: IDisease): Observable<any> {
    return this.http.post(this.apiUrl, Disease);
  }
  getDisease(DiseaseId: number) {
    return this.http.get<IDisease>(this.apiUrl + DiseaseId);
  }
  updateDisease( Disease:IDisease):Observable<any> {
    console.log(Disease)
    return this.http.put<IDisease>(this.apiUrl , Disease);
  }


  deleteDisease(DiseaseId: number) {
    let p=this.apiUrl + DiseaseId;
    console.log(p)
    return this.http.delete(this.apiUrl + DiseaseId);
  }
}
