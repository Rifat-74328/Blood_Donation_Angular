import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IDisease } from 'src/app/api/IDisease.model';
import { DiseaseService } from 'src/app/Services/disease.service';

@Component({
  selector: 'app-add-disease',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './add-disease.component.html',
  styleUrl: './add-disease.component.scss'
})
export class AddDiseaseComponent {

  builder = inject(FormBuilder);
  service = inject(DiseaseService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Diseases:IDisease[]=[];

  submitted = false;
  DiseaseForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]],
    Description: ['', [Validators.required]],
    Symptoms: ['', [Validators.required]]
  });

  DiseaseId!: number;
  isEdit = false;

  ngOnInit() {
    this.DiseaseId = this.route.snapshot.params['Id'];
    if (this.DiseaseId) {
      this.isEdit = true;
      this.service.getDisease(this.DiseaseId).subscribe((result) => {
        console.log(result);
        this.DiseaseForm.patchValue(result);
        
      });
    }
    
  }
  RefreshList(){
    this.service.getAllDisease().subscribe((result: IDisease[]) => {
      this.Diseases = result;
      console.log(result);
    });
  }

  Save() {
    console.log(this.DiseaseForm.value);
    const disease: IDisease = {
      Id: this.DiseaseForm.value.Id!,
      Name: this.DiseaseForm.value.Name!,
      Description: this.DiseaseForm.value.Description!,
      Symptoms: this.DiseaseForm.value.Symptoms!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(disease);
      this.service.updateDisease( disease).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/countrylist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      debugger
      this.service.createDisease(disease).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/diseaselist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
