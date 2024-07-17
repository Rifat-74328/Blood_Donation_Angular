import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDegree } from '../api/IDegree.model';



@Injectable({
  providedIn: 'root'
})
export class DegreeService {
apiUrl ="https://localhost:44386/api/Degree/"
http = inject(HttpClient)
  constructor() { }
  getAllDegree() {
    // debugger
    return this.http.get<IDegree[]>(this.apiUrl);
  }
  createDegree(Degree: IDegree): Observable<any> {
    return this.http.post(this.apiUrl, Degree);
  }
  getDegree(DegreeId: number) {
    return this.http.get<IDegree>(this.apiUrl + DegreeId);
  }
  updateDegree( Degree:IDegree):Observable<any> {
    console.log(Degree)
    return this.http.put<IDegree>(this.apiUrl , Degree);
  }


  deleteDegree(DegreeId: number) {
    return this.http.delete(this.apiUrl + DegreeId);
  }
}
