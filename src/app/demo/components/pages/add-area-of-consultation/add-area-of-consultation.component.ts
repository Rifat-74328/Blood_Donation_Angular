import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IAreaofConsultation } from 'src/app/api/IAreaofConsultation.model';
import { AreaOfConsultationService } from 'src/app/Services/area-of-consultation.service';

@Component({
  selector: 'app-add-area-of-consultation',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './add-area-of-consultation.component.html',
  styleUrl: './add-area-of-consultation.component.scss'
})
export class AddAreaOfConsultationComponent {

  builder = inject(FormBuilder);
  service = inject(AreaOfConsultationService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Areas:IAreaofConsultation[]=[];
  singleCountry:IAreaofConsultation | undefined;

  submitted = false;
  areaForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]]
  });

  areaId!: number;
  isEdit = false;

  ngOnInit() {
    this.areaId = this.route.snapshot.params['Id'];
    if (this.areaId) {
      this.isEdit = true;
      this.service.getAreaOfConsultation(this.areaId).subscribe((result) => {
        console.log(result);
        this.areaForm.patchValue(result);
        
      });
    }
    
  }
  RefreshList(){
    this.service.getAllAreaOfConsultation().subscribe((result: IAreaofConsultation[]) => {
      this.Areas = result;
      console.log(result);
    });
  }

  Save() {
    console.log(this.areaForm.value);
    const area: IAreaofConsultation = {
      Id: this.areaForm.value.Id!,
      Name: this.areaForm.value.Name!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(area);
      this.service.updateAreaOfConsultation( area).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/consultationarealist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else 
    {
      debugger
      this.service.createAreaOfConsultation(area).subscribe(
        (result) => console.log(result)
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/consultationarealist');
      // this.toaster.success('Record created Successfully');
      //}
    }
  
  }


}

