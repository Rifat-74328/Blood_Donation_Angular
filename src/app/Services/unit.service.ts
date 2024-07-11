import { Injectable } from '@angular/core';
import { Unit } from '../api/unit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const baseUrl="https://localhost:7176/api/Units";
@Injectable({
  providedIn: 'root'
})
export class UnitService {

 
  constructor(private http:HttpClient) { }
  getAll(): Observable<Unit[]> {
    return this.http.get<Unit[]>(baseUrl);
  }

  get(id: any): Observable<Unit> {
    return this.http.get<Unit>(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    console.log(data)
    return this.http.post(baseUrl, data);
  }

  update(  data: any): Observable<any> {
    return this.http.put(`${baseUrl}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deletebyItem(data: Unit): Observable<any> {
    return this.http.delete(`${baseUrl}/{data}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${baseUrl}?title=${title}`);
  }

}
