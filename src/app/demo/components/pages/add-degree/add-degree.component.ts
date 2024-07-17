import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IDegree } from 'src/app/api/IDegree.model';
import { DegreeService } from 'src/app/Services/degree.service';

@Component({
  selector: 'app-add-degree',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './add-degree.component.html',
  styleUrl: './add-degree.component.scss'
})
export class AddDegreeComponent {

  builder = inject(FormBuilder);
  service = inject(DegreeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Degrees:IDegree[]=[];

  submitted = false;
  DegreeForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]]
  });

  DegreeId!: number;
  isEdit = false;

  ngOnInit() {
    this.DegreeId = this.route.snapshot.params['Id'];
    if (this.DegreeId) {
      this.isEdit = true;
      this.service.getDegree(this.DegreeId).subscribe((result) => {
        console.log(result);
        this.DegreeForm.patchValue(result);
        
      });
    }
    
  }
  RefreshList(){
    this.service.getAllDegree().subscribe((result: IDegree[]) => {
      this.Degrees = result;
      console.log(this.Degrees);
    });
  }

  Save() {
    console.log(this.DegreeForm.value);
    const Degree: IDegree = {
      Id: this.DegreeForm.value.Id!,
      Name: this.DegreeForm.value.Name!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(Degree);
      this.service.updateDegree( Degree).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/degreelist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      debugger
      this.service.createDegree(Degree).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/degreelist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
