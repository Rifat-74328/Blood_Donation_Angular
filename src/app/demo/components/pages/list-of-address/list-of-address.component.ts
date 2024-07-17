import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IAddress_info } from 'src/app/api/IAddress_info.model';
import { IArea } from 'src/app/api/IArea.model';
import { ICountry } from 'src/app/api/ICountry.model';
import { IDistrict } from 'src/app/api/IDistrict.model';
import { IDivision } from 'src/app/api/IDivision.model';
import { IThana } from 'src/app/api/IThana.model';
import { AddressInfoService } from 'src/app/Services/address-info.service';
import { AreaService } from 'src/app/Services/area.service';
import { CountryService } from 'src/app/Services/country.service';
import { DistrictService } from 'src/app/Services/district.service';
import { DivisionService } from 'src/app/Services/division.service';
import { ThanaService } from 'src/app/Services/thana.service';

@Component({
  selector: 'app-list-of-address',
  standalone: true,
  imports: [ButtonModule,TableModule,RippleModule,FormsModule,MatIconModule,TooltipModule,RouterLink],
  templateUrl: './list-of-address.component.html',
  styleUrl: './list-of-address.component.scss'
})
export class ListOfAddressComponent implements OnInit {
  addressList: IAddress_info[] = [];
  countryList: ICountry[] = [];
  divisionList: IDivision[] = [];
  districtList: IDistrict[] = [];
  thanaList: IThana[] = [];
  areaList: IArea[] = [];

  displayedColumns: string[] = ['id', 'countryId', 'divisionId', 'districtId', 'thanaId', 'areaId', 'Action'];

  constructor(
    private router: Router,
    private addressInfoService: AddressInfoService,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private thanaService: ThanaService,
    private areaService: AreaService
  ) {}

   ngOnInit() {
    this.loadAddresses();
    this.loadCountries();
    this.loadDivisions();
    this.loadDistricts();
    this.loadThanas();
    this.loadAreas();
   }

  loadAddresses() {
    this.addressInfoService.getAllAddress().subscribe({
      next: (result: IAddress_info[]) => this.addressList = result,
      error: err => console.error('Error loading addresses', err)
    });
    console.log(this.addressList)
  }

  loadCountries() {
    this.countryService.getAllCountry().subscribe({
      next: (result: ICountry[]) => this.countryList = result,
      error: err => console.error('Error loading countries', err)
    });
  }

  loadDivisions() {
    this.divisionService.getAllDivision().subscribe({
      next: (result: IDivision[]) => this.divisionList = result,
      error: err => console.error('Error loading divisions', err)
    });
  }

  loadDistricts() {
    this.districtService.getAllDistrict().subscribe({
      next: (result: IDistrict[]) => this.districtList = result,
      error: err => console.error('Error loading districts', err)
    });
  }

  loadThanas() {
    this.thanaService.getAllThana().subscribe({
      next: (result: IThana[]) => this.thanaList = result,
      error: err => console.error('Error loading thanas', err)
    });
  }

  loadAreas() {
    this.areaService.getAllArea().subscribe({
      next: (result: IArea[]) => this.areaList = result,
      error: err => console.error('Error loading areas', err)
    });
  }

  // Navigate to the edit form
  Edit(addressId: number) {
    console.log(addressId);
    this.router.navigateByUrl("/addaddress/" + addressId);
  }

  Delete(addressId: number) {
    this.addressInfoService.deleteAddress(addressId).subscribe({
      next: () => {
        console.log("Deleted");
        this.loadAddresses();
      },
      error: err => console.error('Error deleting address', err)
    });
  }

  getCountryName(cid: number) {
    const country = this.countryList.find(c => c.Id === cid);
    return country ? country.Name : 'Unknown';
  }

  getDivisionName(divid: number) {
    debugger
    const div = this.divisionList.find(d => d.Id === divid);
    return div ? div.Name : 'Unknown';
  }

  getDistrictName(disid: number) {
    const district = this.districtList.find(d => d.Id === disid);
    return district ? district.Name : 'Unknown';
  }

  getThanaName(tid: number) {
    const thana = this.thanaList.find(t => t.Id === tid);
    return thana ? thana.Name : 'Unknown';
  }

  getAreaName(aid: number) {
    const area = this.areaList.find(a => a.Id === aid);
    return area ? area.Name : 'Unknown';
  }
}

