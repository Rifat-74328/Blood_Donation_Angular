import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDonerType } from '../api/IDonerType.model';



@Injectable({
  providedIn: 'root'
})
export class DonerTypeService {
apiUrl ="https://localhost:44386/api/DonerType/"
http = inject(HttpClient)
  constructor() { }
  getAllDonerType() {
    // debugger
    return this.http.get<IDonerType[]>(this.apiUrl);
  }
  createDonerType(DonerType: IDonerType): Observable<any> {
    debugger
    return this.http.post(this.apiUrl, DonerType);
  }
  getDonerType(DonerTypeId: number) {
    return this.http.get<IDonerType>(this.apiUrl + DonerTypeId);
  }
  updateDonerType( DonerType:IDonerType):Observable<any> {
    console.log(DonerType)
    return this.http.put<IDonerType>(this.apiUrl , DonerType);
  }


  deleteDonerType(DonerTypeId: number) {
 
    return this.http.delete(this.apiUrl + DonerTypeId);
  }
}
