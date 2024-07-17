import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
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
  selector: 'app-add-addres',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,DropdownModule,AutoCompleteModule ],
  templateUrl: './add-addres.component.html',
  styleUrl: './add-addres.component.scss'
})
export class AddAddresComponent implements OnInit {
  addressInfoForm: FormGroup;
  isCountrySelected:boolean=false;
  CountryId!: number;
  addresses!:IAddress_info[];
  countries: ICountry[] = [];
  divisions: IDivision[] = [];
  districts: IDistrict[] = [];
  thanas: IThana[] = [];
  areas: IArea[] = [];
  selectedCountry!:ICountry
  selectedDivision!:IDivision
  selectedDistrict!:IDistrict
  selectedThana!:IThana
  selectedArea!:IThana
  
  filteredCountries: ICountry[] =[];
  filteredDivisions: IDivision[] =[];
  filteredDistricts: IDistrict[] =[];
  filteredThanas: IThana[] =[];
  filteredAreas: IArea[] =[];

  isEdit = false;
  addressinfoId!:number;
  constructor(
    private fb: FormBuilder,
    private addressInfoService: AddressInfoService,
    private router: Router,
    private countryService: CountryService,
    private divisionService: DivisionService,
    private districtService: DistrictService,
    private thanaService: ThanaService,
    private areaService: AreaService,
    private route:ActivatedRoute
  ) {
    this.addressInfoForm = this.fb.group({
      Id:[0],
      CountryId: [0, Validators.required],
      DivisionId: [0, Validators.required],
      DistrictId: [0, Validators.required],
      ThanaId: [0, Validators.required],
      AreaId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchCountries(); // Fetch initial data on component initialization
    this.addressinfoId = this.route.snapshot.params['Id'];
    if (this.addressinfoId) {
      this.isEdit = true;
      this.addressInfoService.getAddress(this.addressinfoId).subscribe((result) => {
        console.log(result);
        this.addressInfoForm.patchValue(result);
        
      });
    }
  }
  //filter start

  filterCountry(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.countries as any[]).length; i++) {
        let country = (this.countries as any[])[i];
        if (country.Name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredCountries = filtered;
  }


  filterDivision(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.divisions as any[]).length; i++) {
        let division = (this.divisions as any[])[i];
        if (division.Name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(division);
        }
    }

    this.filteredDivisions = filtered;
  }

  filterDistricts(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.districts as any[]).length; i++) {
        let district = (this.districts as any[])[i];
        if (district.Name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(district);
        }
    }

    this.filteredDistricts = filtered;
  }


  filterThanas(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.thanas as any[]).length; i++) {
        let thana = (this.thanas as any[])[i];
        if (thana.Name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(thana);
        }
    }

    this.filteredThanas = filtered;
  }

  filterAreas(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.areas as any[]).length; i++) {
        let area = (this.areas as any[])[i];
        if (area.Name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(area);
        }
    }

    this.filteredAreas = filtered;
  }

  //filter end



  fetchCountries() {
    this.countryService.getAllCountry().subscribe(countries => {
      this.countries = countries;
      console.log(countries)
    });
  }

  //fetchDivisions() {
     //st
    // const x:number=this.addressInfoForm.value.countryId!;
    // this.divisionService.getAllDivisionByCountryId(x).subscribe(c=>{
    //   debugger
      
    //   // let y:IDivision[]=c.filter(d=>d.countryId===x)
    //    this.divisions=c
    //   console.log(this.divisions)
    // })
    //end
  //}



  fetchDivisions() {
    debugger
    
      const selectedCountryId = this.addressInfoForm.value.CountryId!;
      this.divisionService.getAllDivisionByCountryId(selectedCountryId).subscribe({
        next: (result: IDivision[]) => this.divisions = result,
        error: err => console.error('Error loading divisions', err)
      });
    
     
    
  }

  fetchDistricts() {
    debugger
    const selectedDivId= this.addressInfoForm.value.DivisionId!

    // if try to get the value from the input form=>
    //const x:number=this.addressInfoForm.value.divisionId!; 
    if(selectedDivId){this.districtService.getDistrictsByDivisionId(selectedDivId).subscribe(c=>{      
      // let y:IDivision[]=c.filter(d=>d.countryId===x)
      this.districtService.getDistrictsByDivisionId(selectedDivId).subscribe(d=>{
        this.districts=d
      })
      console.log(this.districts)
  })}
    
  }
  fetchThana() {
    debugger
    const did=this.addressInfoForm.value.DistrictId!;
    if(did){
    this.thanaService.getThanasByDistrictId(did).subscribe(c=>{
      this.thanas=c
      console.log(c)
      
    })
  }
    // this.thanaService.getAllThana().subscribe(thana => {
    //   this.thanas = thana;
    //   console.log(this.thanas)
    // });
  }

  fetchArea() {
    debugger
    const tid=this.addressInfoForm.value.ThanaId!;
    if(tid){
    this.areaService.getAreasByThanaId(tid).subscribe(areas => {
      this.areas = areas;
      console.log(this.areas)
    });
  }
  }


  // Save(): void {
  //   if (this.addressInfoForm.valid) {
  //     const addressInfo: IAddress_info = this.addressInfoForm.value;
  //     this.addressInfoService.createAddress(addressInfo).subscribe(() => {
  //       this.router.navigateByUrl('/'); // Navigate to home or desired page after successful save
  //     });
  //   }
  // }


  Save() {
    debugger;
    console.log(this.addressInfoForm.value);
    const address: IAddress_info = {
      
      Id: this.addressInfoForm.value.Id!,
      CountryId: this.addressInfoForm.value.CountryId!,
      DivisionId:this.addressInfoForm.value.DivisionId!,
      DistrictId:this.addressInfoForm.value.DistrictId!,
      ThanaId:this.addressInfoForm.value.ThanaId!,
      AreaId:this.addressInfoForm.value.AreaId!,
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(address);
      this.addressInfoService.updateAddress(address).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/addresslist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      this.addressInfoService.createAddress(address).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/addresslist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }
  RefreshList() {
    return this.addressInfoService.getAllAddress().subscribe(c=>{
      this.addresses=c
    });
  }



}