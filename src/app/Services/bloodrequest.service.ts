import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBloodRequest } from '../api/IBloodRequest.model';



@Injectable({
  providedIn: 'root'
})
export class BloodRequestService {
apiUrl ="https://localhost:44386/api/Blood_Request/"
http = inject(HttpClient)
  constructor() { }
  getAllReq() {
    // debugger
    return this.http.get<IBloodRequest[]>(this.apiUrl);
  }
  createReq(Req: IBloodRequest): Observable<any> {
    return this.http.post(this.apiUrl, Req);
  }
  getReq(ReqId: number) {
    return this.http.get<IBloodRequest>(this.apiUrl + ReqId);
  }
  updateReq( Req:IBloodRequest):Observable<any> {
    console.log(Req)
    return this.http.put<IBloodRequest>(this.apiUrl , Req);
  }


  deleteReq(ReqId: number) {
    return this.http.delete(this.apiUrl + ReqId);
  }
}
