import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDesignation } from '../api/IDesignation.model';


@Injectable({
  providedIn: 'root'
})
export class DesignationService {
apiUrl ="https://localhost:44386/api/Designation/"
http = inject(HttpClient)
  constructor() { }
  getAllDesignation() {
    // debugger
    return this.http.get<IDesignation[]>(this.apiUrl);
  }
  createDesignation(Designation: IDesignation): Observable<any> {
    return this.http.post(this.apiUrl, Designation);
  }
  getDesignation(DesignationId: number) {
    return this.http.get<IDesignation>(this.apiUrl + DesignationId);
  }
  updateDesignation( Designation:IDesignation):Observable<any> {
    console.log(Designation)
    return this.http.put<IDesignation>(this.apiUrl , Designation);
  }


  deleteDesignation(DesignationId: number) {
    return this.http.delete(this.apiUrl + DesignationId);
  }
}
