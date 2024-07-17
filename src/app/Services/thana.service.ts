import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IThana } from '../api/IThana.model';



@Injectable({
  providedIn: 'root'
})
export class ThanaService {
apiUrl ="https://localhost:44386/api/Thana/"
http = inject(HttpClient)
  constructor() { }
  getAllThana() {
    // debugger
    return this.http.get<IThana[]>(this.apiUrl);
  }
  createThana(Thana: IThana): Observable<any> {
    debugger
    return this.http.post(this.apiUrl, Thana);
  }
  getThana(ThanaId: number) {
    return this.http.get<IThana>(this.apiUrl + ThanaId);
  }
  updateThana( Thana:IThana):Observable<any> {
    console.log(Thana)
    return this.http.put<IThana>(this.apiUrl , Thana)
  }


  deleteThana(ThanaId: number) {
    // let p=this.apiUrl + DivisionId;
    // console.log(p)
    return this.http.delete(this.apiUrl + ThanaId);
  }

  getThanasByDistrictId(dId:number) {
    return this.http.get<IThana[]>(this.apiUrl+"?dId="+dId)
   }
}
