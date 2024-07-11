import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDivision } from '../api/IDivision.model';



@Injectable({
  providedIn: 'root'
})
export class DivisionService {
apiUrl ="https://localhost:44386/api/Division/"
http = inject(HttpClient)
  constructor() { }
  getAllDivision() {
    // debugger
    return this.http.get<IDivision[]>(this.apiUrl);
  }
  createDivision(Division: IDivision): Observable<any> {
    debugger
    return this.http.post(this.apiUrl, Division);
  }
  getDivision(DivisionId: number) {
    return this.http.get<IDivision>(this.apiUrl + DivisionId);
  }
  updateDivision( Division:IDivision):Observable<any> {
    console.log(Division)
    return this.http.put<IDivision>(this.apiUrl , Division);
  }


  deleteDivision(DivisionId: number) {
    // let p=this.apiUrl + DivisionId;
    // console.log(p)
    return this.http.delete(this.apiUrl + DivisionId);
  }
}
