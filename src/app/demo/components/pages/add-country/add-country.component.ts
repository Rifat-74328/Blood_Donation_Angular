import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CountryService } from 'src/app/Services/country.service';
import { ICountry } from 'src/app/api/ICountry.model';
@Component({
  selector: 'app-country',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatDividerModule,RouterLink],
  templateUrl: './add-country.component.html',
  styleUrl: './add-country.component.css'
})
export class AddCountryComponent {

  builder = inject(FormBuilder);
  service = inject(CountryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Countries:ICountry[]=[];
  singleCountry:ICountry | undefined;

  submitted = false;
  countryForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]]
  });

  countryId!: number;
  isEdit = false;

  ngOnInit() {
    this.countryId = this.route.snapshot.params['Id'];
    if (this.countryId) {
      this.isEdit = true;
      this.service.getCountry(this.countryId).subscribe((result) => {
        console.log(result);
        this.countryForm.patchValue(result);
        
      });
    }
    
  }
  RefreshList(){
    this.service.getAllCountry().subscribe((result: ICountry[]) => {
      this.Countries = result;
      console.log(this.Countries);
    });
  }

  Save() {
    console.log(this.countryForm.value);
    const country: ICountry = {
      Id: this.countryForm.value.Id!,
      Name: this.countryForm.value.Name!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(country);
      this.service.updateCountry( country).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/countrylist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      debugger
      this.service.createCountry(country).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/countrylist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
