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
@Component({
  selector: 'app-division',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatDividerModule,RouterLink,DropdownModule, MatSelectModule,MatInputModule,
    MatFormFieldModule,],
  templateUrl: './add-division.component.html',
  styleUrl: './add-division.component.css'
})
export class AddDivisionComponent {

  builder = inject(FormBuilder);
  service = inject(DivisionService);
  country_srv = inject(CountryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Divisions:IDivision[]=[];
  singledivision:IDivision | undefined;
  Countries:ICountry[]=[]
  Selectedcountry!:ICountry
  submitted = false;
  divisionForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]],
    CountryId: [0, [Validators.required]]
  });

  divisionId!: number;
  isEdit = false;

  ngOnInit() {
    debugger
    this.divisionId = this.route.snapshot.params['Id'];
    if (this.divisionId) {
      this.isEdit = true;
      this.service.getDivision(this.divisionId).subscribe((result) => {
        console.log(result);
        this.divisionForm.patchValue(result);
        
      });
    }
    this.getCountry();
    
  }

  getCountry(){ this.country_srv.getAllCountry().subscribe((r:ICountry[])=>{
    this.Countries=r
    console.log("countries" ,r)
    })
  }
  RefreshList(){
    this.service.getAllDivision().subscribe((result: IDivision[]) => {
      this.Divisions = result;
      console.log(this.Divisions);
    });
  }

  Save() {
    console.log(this.divisionForm.value);
    const division: IDivision = {
      Id: this.divisionForm.value.Id!,
      Name: this.divisionForm.value.Name!,
      CountryId:this.divisionForm.value.CountryId!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(division);
      this.service.updateDivision( division).subscribe((r) => {
        console.log(r);
         this.router.navigateByUrl('/pages/crud/divisionlist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      this.service.createDivision(division).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/divisionlist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
