import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IMember } from '../api/IMember.model';



@Injectable({
  providedIn: 'root'
})
export class MemberService {
apiUrl ="https://localhost:44386/api/Member/"
http = inject(HttpClient)
  constructor() { }
  getAllMember() {
    // debugger
    return this.http.get<IMember[]>(this.apiUrl);
  }
  createMember(member: IMember): Observable<any> {
    return this.http.post(this.apiUrl, member);
  }
  getMember(memberId: number) {
    return this.http.get<IMember>(this.apiUrl + memberId);
  }
  updateMember( member:IMember):Observable<any> {
    console.log(member)
    return this.http.put<IMember>(this.apiUrl , member);
  }


  deleteMember(memberId: number) {
    return this.http.delete(this.apiUrl + memberId);
  }
}
