import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IAddress_info } from '../api/IAddress_info.model';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AddressInfoService {
apiUrl="https://localhost:44386/api/Address_Info/"
http=inject(HttpClient)
  constructor(private snackBar: MatSnackBar) { }
  getAllAddress(){
    return this.http.get<IAddress_info[]>(this.apiUrl)
  }
  getAddress(id:number){
    return this.http.get<IAddress_info>(this.apiUrl+id)
  }
  createAddress(address:IAddress_info){
    debugger;
    console.log(address)
    return this.http.post<any>(`${this.apiUrl}`, address)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.snackBar.open(error.error.message || 'Error occurred', 'Close', {
            duration: 5000,
            verticalPosition:'top'
          });
          return throwError(error);
        })
      );
  }

  updateAddress(address:IAddress_info){
    return this.http.put<IAddress_info>(this.apiUrl,address)
  }
  deleteAddress(id:number){
    return this.http.delete<IAddress_info>(this.apiUrl+id)
  }
  getAllDivisionByCountryId(Id:number){
    this.http.get<IAddress_info>(this.apiUrl+"?Id="+Id)
  }
}
