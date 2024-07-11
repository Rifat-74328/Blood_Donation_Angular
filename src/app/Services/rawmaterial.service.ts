import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterials } from '../api/raw-materials.model';
import { Observable } from 'rxjs';
const baseUrl="https://localhost:7176/api/RawMaterials";
@Injectable({
  providedIn: 'root'
})
export class RawmaterialService {

  
  constructor(private http:HttpClient) { }
  getAll(): Observable<RawMaterials[]> {
    return this.http.get<RawMaterials[]>(baseUrl);
  }

  get(id: any): Observable<RawMaterials> {
    return this.http.get<RawMaterials>(`${baseUrl}/${id}`);
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
  deletebyItem(data: RawMaterials): Observable<any> {
    return this.http.delete(`${baseUrl}/{data}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<RawMaterials[]> {
    return this.http.get<RawMaterials[]>(`${baseUrl}?title=${title}`);
  }

}
