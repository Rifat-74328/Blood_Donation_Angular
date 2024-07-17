import { inject, Injectable } from '@angular/core';
import { ISpeacialInterest } from '../api/ISpeacialInterest.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeacialInterestService {
  apiUrl ="https://localhost:44386/api/SpeacialInterest/"
  http = inject(HttpClient)
    constructor() { }
    getAllSpeacialInterest() {
      // debugger
      return this.http.get<ISpeacialInterest[]>(this.apiUrl);
    }
    createSpeacialInterest(SpeacialInterest: ISpeacialInterest): Observable<any> {
      return this.http.post(this.apiUrl, SpeacialInterest);
    }
    getSpeacialInterest(SpeacialInterestId: number) {
      return this.http.get<ISpeacialInterest>(this.apiUrl + SpeacialInterestId);
    }
    updateSpeacialInterest( SpeacialInterest:ISpeacialInterest):Observable<any> {
      console.log(SpeacialInterest)
      return this.http.put<ISpeacialInterest>(this.apiUrl , SpeacialInterest);
    }
  
  
    deleteSpeacialInterest(SpeacialInterestId: number) {
      let p=this.apiUrl + SpeacialInterestId;
      console.log(p)
      return this.http.delete(this.apiUrl + SpeacialInterestId);
    }
  }
  
