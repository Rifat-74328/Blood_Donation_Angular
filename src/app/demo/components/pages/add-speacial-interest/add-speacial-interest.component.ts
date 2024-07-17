import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ISpeacialInterest } from 'src/app/api/ISpeacialInterest.model';
import { SpeacialInterestService } from 'src/app/Services/speacial-interest.service';

@Component({
  selector: 'app-add-speacial-interest',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './add-speacial-interest.component.html',
  styleUrl: './add-speacial-interest.component.scss'
})
export class AddSpeacialInterestComponent {

  builder = inject(FormBuilder);
  service = inject(SpeacialInterestService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Interests:ISpeacialInterest[]=[];

  submitted = false;
  SpeacialInterestForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]]
  });

  SpeacialInterestId!: number;
  isEdit = false;

  ngOnInit() {
    this.SpeacialInterestId = this.route.snapshot.params['Id'];
    if (this.SpeacialInterestId) {
      this.isEdit = true;
      this.service.getSpeacialInterest(this.SpeacialInterestId).subscribe((result) => {
        console.log(result);
        this.SpeacialInterestForm.patchValue(result);
        
      });
    }
    
  }
  RefreshList(){
    this.service.getAllSpeacialInterest().subscribe((result: ISpeacialInterest[]) => {
      this.Interests = result;
      console.log(this.Interests);
    });
  }

  Save() {
    console.log(this.SpeacialInterestForm.value);
    const SpeacialInterest: ISpeacialInterest = {
      Id: this.SpeacialInterestForm.value.Id!,
      Name: this.SpeacialInterestForm.value.Name!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(SpeacialInterest);
      this.service.updateSpeacialInterest( SpeacialInterest).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/interestlist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      debugger
      this.service.createSpeacialInterest(SpeacialInterest).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/interestlist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}

