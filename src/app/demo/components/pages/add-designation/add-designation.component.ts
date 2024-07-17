import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IDesignation } from 'src/app/api/IDesignation.model';
import { DesignationService } from 'src/app/Services/designation.service';

@Component({
  selector: 'app-add-designation',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './add-designation.component.html',
  styleUrl: './add-designation.component.scss'
})
export class AddDesignationComponent {

  builder = inject(FormBuilder);
  service = inject(DesignationService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Countries:IDesignation[]=[];

  submitted = false;
  DesignationForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]],
    Description: ['', [Validators.required]]
  });

  DesignationId!: number;
  isEdit = false;

  ngOnInit() {
    this.DesignationId = this.route.snapshot.params['Id'];
    if (this.DesignationId) {
      this.isEdit = true;
      this.service.getDesignation(this.DesignationId).subscribe((result) => {
        console.log(result);
        this.DesignationForm.patchValue(result);
        
      });
    }
    
  }
  RefreshList(){
    this.service.getAllDesignation().subscribe((result: IDesignation[]) => {
      this.Countries = result;
      console.log(this.Countries);
    });
  }

  Save() {
    console.log(this.DesignationForm.value);
    const Designation: IDesignation = {
      Id: this.DesignationForm.value.Id!,
      Name: this.DesignationForm.value.Name!,
      Description: this.DesignationForm.value.Description!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(Designation);
      this.service.updateDesignation( Designation).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/designationlist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      debugger
      this.service.createDesignation(Designation).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/designationlist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}

