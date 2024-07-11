import { Injectable } from '@angular/core';
import { Requisition } from '../api/requisition.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const baseUrl="https://localhost:7176/api/Categories";
@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

 
  constructor(private http:HttpClient) { }
  getAll(): Observable<Requisition[]> {
    return this.http.get<Requisition[]>(baseUrl);
  }

  get(id: any): Observable<Requisition> {
    return this.http.get<Requisition>(`${baseUrl}/${id}`);
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
  deletebyItem(data: Requisition): Observable<any> {
    return this.http.delete(`${baseUrl}/{data}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Requisition[]> {
    return this.http.get<Requisition[]>(`${baseUrl}?title=${title}`);
  }
}
