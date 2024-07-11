import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from '../api/menu-item.model';
import { HttpClient } from '@angular/common/http';
const baseUrl="https://localhost:7176/api/MenuItem";
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private http:HttpClient) { }
  getAll(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(baseUrl);
  }
  getbyCat(catId: number): Observable<MenuItem[]> {
console.log(`${baseUrl}/${catId}`)
    return this.http.get<MenuItem[]>(`${baseUrl}?catId=${catId}`);
  }
  get(id: any): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${baseUrl}/${id}`);
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
  deletebyItem(data: MenuItem): Observable<any> {
    return this.http.delete(`${baseUrl}/{data}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${baseUrl}?title=${title}`);
  }

}
