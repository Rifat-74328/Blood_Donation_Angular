import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IAreaofConsultation } from '../api/IAreaofConsultation.model';


@Injectable({
  providedIn: 'root'
})
export class AreaOfConsultationService {
apiUrl ="https://localhost:44386/api/AreaOfConsultations/"
http = inject(HttpClient)
  constructor() { }
  getAllAreaOfConsultation() {
    // debugger
    return this.http.get<IAreaofConsultation[]>(this.apiUrl);
  }
  createAreaOfConsultation(area: IAreaofConsultation): Observable<any> {
    return this.http.post(this.apiUrl, area);
  }
  getAreaOfConsultation(areaId: number) {
    return this.http.get<IAreaofConsultation>(this.apiUrl + areaId);
  }
  updateAreaOfConsultation( area:IAreaofConsultation):Observable<any> {
    console.log(area)
    return this.http.put<IAreaofConsultation>(this.apiUrl , area);
  }


  deleteAreaOfConsultation(areaId: number) {
    let p=this.apiUrl + areaId;
    console.log(p)
    return this.http.delete(this.apiUrl + areaId);
  }

}