import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBloodReqInfo } from '../api/IBloodReqInfo.model';



@Injectable({
  providedIn: 'root'
})
export class BloodRequestInfoService {
apiUrl ="https://localhost:44386/api/Blood_Req_Info/"
http = inject(HttpClient)
  constructor() { }
  getAllReqInfo() {
    // debugger
    return this.http.get<IBloodReqInfo[]>(this.apiUrl);
  }
  createReqInfo(Req: IBloodReqInfo): Observable<any> {
    return this.http.post(this.apiUrl, Req);
  }
  getReqInfo(ReqId: number) {
    return this.http.get<IBloodReqInfo>(this.apiUrl + ReqId);
  }
  updateReqInfo( Req:IBloodReqInfo):Observable<any> {
    console.log(Req)
    return this.http.put<IBloodReqInfo>(this.apiUrl , Req);
  }


  deleteReqInfo(ReqId: number) {
    return this.http.delete(this.apiUrl + ReqId);
  }
}
