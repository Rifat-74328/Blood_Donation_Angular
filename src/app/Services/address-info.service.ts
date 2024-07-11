import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IAddress_info } from '../api/IAddress_info.model';

@Injectable({
  providedIn: 'root'
})
export class AddressInfoService {
apiUrl="https://localhost:7150/api/Address_Info/"
http=inject(HttpClient)
  constructor() { }
  getAllAddress(){
    return this.http.get<IAddress_info[]>(this.apiUrl)
  }
  getAddress(id:number){
    return this.http.get<IAddress_info>(this.apiUrl+id)
  }
  createAddress(address:IAddress_info){
    debugger;
    console.log(address)
    let ad={
    CountryId:address.CountryId,
    DivisionId:address.DivisionId,
    DistrictId:address.DistrictId,
    ThanaId:address.ThanaId,
    AreaId:address.AreaId
    }
    return this.http.post<IAddress_info>(this.apiUrl,ad)
  }

  updateAddress(address:IAddress_info){
    return this.http.put<IAddress_info>(this.apiUrl,address)
  }
  deleteAddress(id:number){
    return this.http.delete<IAddress_info>(this.apiUrl+id)
  }
}
