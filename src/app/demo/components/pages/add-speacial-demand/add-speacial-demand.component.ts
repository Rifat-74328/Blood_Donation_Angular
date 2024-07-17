import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ISpeacialDemand } from 'src/app/api/ISpeacialDemand.model';
import { SpeacialDemandService } from 'src/app/Services/SpeacialDemand.service';

@Component({
  selector: 'app-add-speacial-demand',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-speacial-demand.component.html',
  styleUrl: './add-speacial-demand.component.scss'
})
export class AddSpeacialDemandComponent {

  builder = inject(FormBuilder);
  service = inject(SpeacialDemandService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Demands:ISpeacialDemand[]=[];

  submitted = false;
  SpeacialDemandForm = this.builder.group({
    Id: [0],
    Demands: ['', [Validators.required]]
  });

  SpeacialDemandId!: number;
  isEdit = false;

  ngOnInit() {
    this.SpeacialDemandId = this.route.snapshot.params['Id'];
    if (this.SpeacialDemandId) {
      this.isEdit = true;
      this.service.getSpeacialDemand(this.SpeacialDemandId).subscribe((result) => {
        console.log(result);
        this.SpeacialDemandForm.patchValue(result);
        
      });
    }
    
  }
  RefreshList(){
    this.service.getAllSpeacialDemand().subscribe((result: ISpeacialDemand[]) => {
      this.Demands = result;
      console.log(this.Demands);
    });
  }

  Save() {
    console.log(this.SpeacialDemandForm.value);
    const SpeacialDemand: ISpeacialDemand = {
      Id: this.SpeacialDemandForm.value.Id!,
      Demands: this.SpeacialDemandForm.value.Demands!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(SpeacialDemand);
      this.service.updateSpeacialDemand( SpeacialDemand).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/demandlist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      debugger
      this.service.createSpeacialDemand(SpeacialDemand).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/demandlist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}

