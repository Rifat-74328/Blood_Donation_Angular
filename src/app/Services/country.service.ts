import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry } from '../api/ICountry.model';



@Injectable({
  providedIn: 'root'
})
export class CountryService {
apiUrl ="https://localhost:44386/api/Country/"
http = inject(HttpClient)
  constructor() { }
  getAllCountry() {
    // debugger
    return this.http.get<ICountry[]>(this.apiUrl);
  }
  createCountry(country: ICountry): Observable<any> {
    return this.http.post(this.apiUrl, country);
  }
  getCountry(countryId: number) {
    return this.http.get<ICountry>(this.apiUrl + countryId);
  }
  updateCountry( country:ICountry):Observable<any> {
    console.log(country)
    return this.http.put<ICountry>(this.apiUrl , country);
  }


  deleteCountry(countryId: number) {
    let p=this.apiUrl + countryId;
    console.log(p)
    return this.http.delete(this.apiUrl + countryId);
  }
}
