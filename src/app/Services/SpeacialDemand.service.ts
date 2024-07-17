import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ISpeacialDemand } from '../api/ISpeacialDemand.model';


@Injectable({
  providedIn: 'root'
})
export class SpeacialDemandService {
apiUrl ="https://localhost:44386/api/SpeacialDemand/"
http = inject(HttpClient)
  constructor() { }
  getAllSpeacialDemand() {
    // debugger
    return this.http.get<ISpeacialDemand[]>(this.apiUrl);
  }
  createSpeacialDemand(SpeacialDemand: ISpeacialDemand): Observable<any> {
    return this.http.post(this.apiUrl, SpeacialDemand);
  }
  getSpeacialDemand(SpeacialDemandId: number) {
    return this.http.get<ISpeacialDemand>(this.apiUrl + SpeacialDemandId);
  }
  updateSpeacialDemand( SpeacialDemand:ISpeacialDemand):Observable<any> {
    console.log(SpeacialDemand)
    return this.http.put<ISpeacialDemand>(this.apiUrl , SpeacialDemand);
  }


  deleteSpeacialDemand(SpeacialDemandId: number) {
    let p=this.apiUrl + SpeacialDemandId;
    console.log(p)
    return this.http.delete(this.apiUrl + SpeacialDemandId);
  }
}
