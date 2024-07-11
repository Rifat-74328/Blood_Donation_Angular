import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IArea } from '../api/IArea.model';



@Injectable({
  providedIn: 'root'
})
export class AreaService {
apiUrl ="https://localhost:44386/api/Area/"
http = inject(HttpClient)
  constructor() { }
  getAllArea() {
    // debugger
    return this.http.get<IArea[]>(this.apiUrl);
  }
  createArea(area: IArea): Observable<any> {
    return this.http.post(this.apiUrl, area);
  }
  getArea(areaId: number) {
    return this.http.get<IArea>(this.apiUrl + areaId);
  }
  updateArea( area:IArea):Observable<any> {
    console.log(area)
    return this.http.put<IArea>(this.apiUrl , area);
  }


  deleteArea(areaId: number) {
    let p=this.apiUrl + areaId;
    console.log(p)
    return this.http.delete(this.apiUrl + areaId);
  }
}
