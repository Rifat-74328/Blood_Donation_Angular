import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IDistrict } from '../api/IDistrict.model';



@Injectable({
  providedIn: 'root'
})
export class DistrictService {
apiUrl ="https://localhost:44386/api/District/"
http = inject(HttpClient)
  constructor() { }
  getAllDistrict() {
    // debugger
    return this.http.get<IDistrict[]>(this.apiUrl);
  }
  createDistrict(district: IDistrict): Observable<any> {
    return this.http.post(this.apiUrl, district);
  }
  getDistrict(districtId: number) {
    return this.http.get<IDistrict>(this.apiUrl + districtId);
  }
  updateDistrict( district:IDistrict):Observable<any> {
    console.log(district)
    return this.http.put<IDistrict>(this.apiUrl , district);
  }


  deleteDistrict(districtId: number) {
    // let p=this.apiUrl + districtId;
    // console.log(p)
    return this.http.delete(this.apiUrl + districtId);
  }
}
