import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../api/category.model';
const baseUrl="https://localhost:7176/api/Categories";
@Injectable({
  providedIn: 'root'
})
export class CategorService {

  constructor(private http:HttpClient) { }
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(baseUrl);
  }

  get(id: any): Observable<Category> {
    return this.http.get<Category>(`${baseUrl}/${id}`);
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
  deletebyItem(data: Category): Observable<any> {
    return this.http.delete(`${baseUrl}/{data}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}?title=${title}`);
  }
}
