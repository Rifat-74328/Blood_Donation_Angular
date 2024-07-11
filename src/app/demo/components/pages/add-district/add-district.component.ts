import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DivisionService } from 'src/app/Services/division.service';
import { IDivision } from 'src/app/api/IDivision.model';
import { DropdownModule } from 'primeng/dropdown';
import { ICountry } from 'src/app/api/ICountry.model';
import { CountryService } from 'src/app/Services/country.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DistrictService } from 'src/app/Services/district.service';
import { IDistrict } from 'src/app/api/IDistrict.model';
@Component({
  selector: 'app-division',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatDividerModule,RouterLink,DropdownModule, MatSelectModule,MatInputModule,
    MatFormFieldModule,],
  templateUrl: './add-district.component.html',
  styleUrl: './add-district.component.scss'
})
export class AddDistrictComponent {

  builder = inject(FormBuilder);
  div_srv = inject(DivisionService);
  srv     = inject(DistrictService)
  router  = inject(Router);
  route   = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Divisions:IDivision[]=[];
  singledivision:IDivision | undefined;
  Districts:IDistrict[]=[]
  Selecteddistrict!:IDistrict
  submitted = false;
  districtForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]],
    DivisionId: [0, [Validators.required]]
  });

  districtId!: number;
  isEdit = false;

  ngOnInit() {
    debugger
    this.districtId = this.route.snapshot.params['Id'];
    if (this.districtId) {
      this.isEdit = true;
      this.srv.getDistrict(this.districtId).subscribe((result) => {
        console.log(result);
        this.districtForm.patchValue(result);
        
      });
    }
    this.getDivision();
    
  }

  getDivision(){ this.div_srv.getAllDivision().subscribe((r:IDivision[])=>{
    this.Divisions=r
    console.log("Divisions" ,r)
    })
  }
  RefreshList(){
    this.srv.getAllDistrict().subscribe((result: IDistrict[]) => {
      this.Districts = result;
      console.log(this.Districts);
    });
  }

  Save() {
    console.log(this.districtForm.value);
    const district: IDistrict = {
      Id: this.districtForm.value.Id!,
      Name: this.districtForm.value.Name!,
      DivisionId:this.districtForm.value.DivisionId!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(district);
      this.srv.updateDistrict( district).subscribe((r) => {
        console.log(r);
         this.router.navigateByUrl('/pages/crud/districtlist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      this.srv.createDistrict(district).subscribe(
        (result) => 
        console.log(result)
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/districtlist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
