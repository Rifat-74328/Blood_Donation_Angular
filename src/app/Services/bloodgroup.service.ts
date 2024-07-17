import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibloodgroup } from '../api/Ibloodgroup.model';



@Injectable({
  providedIn: 'root'
})
export class BloodGroupService {
apiUrl ="https://localhost:44386/api/Bloodgroups/"
http = inject(HttpClient)
  constructor() { }
  getAllBloodGroup() {
    // debugger
    return this.http.get<Ibloodgroup[]>(this.apiUrl);
  }
  createBloodGroup(bloodgroup: Ibloodgroup): Observable<any> {
    return this.http.post(this.apiUrl, bloodgroup);
  }
  getBloodGroup(bloodgroupId: number) {
    return this.http.get<Ibloodgroup>(this.apiUrl + bloodgroupId);
  }
  updateBloodGroup( bloodgroup:Ibloodgroup):Observable<any> {
    console.log(bloodgroup)
    return this.http.put<Ibloodgroup>(this.apiUrl , bloodgroup);
  }


  deleteBloodGroup(bloodgroupId: number) {
    return this.http.delete(this.apiUrl + bloodgroupId);
  }
}
