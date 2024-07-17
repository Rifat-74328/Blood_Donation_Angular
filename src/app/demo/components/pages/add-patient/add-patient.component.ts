import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IMember } from 'src/app/api/IMember.model';
import { IPatient } from 'src/app/api/IPatient.model';
import { MemberService } from 'src/app/Services/member.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,FormsModule],
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.scss'
})
export class AddPatientComponent {

  builder = inject(FormBuilder);
  service = inject(PatientService);
  mem_srv = inject(MemberService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Patients:IPatient[]=[];
  Members:IMember[]=[]
  submitted = false;
  patientForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]],
    Gender: ['', [Validators.required]],
    ContactNo: ['', [Validators.required]],
    ChiefComplain: ['', [Validators.required]],
    DifferentDiagonosis: ['', [Validators.required]],
    LabratoryFindings: ['', [Validators.required]],
    MemberId: [0, [Validators.required]],
  });

  patientId!: number;
  isEdit = false;

  ngOnInit() {
    debugger
    this.patientId = this.route.snapshot.params['Id'];
    if (this.patientId) {
      this.isEdit = true;
      this.service.getPatient(this.patientId).subscribe((result) => {
        console.log(result);
        this.patientForm.patchValue(result);
        
      });
    }
    this.getMember();
    
  }

  getMember(){ this.mem_srv.getAllMember().subscribe((r:IMember[])=>{
    this.Members=r
    console.log("Members" ,r)
    })
  }
  RefreshList(){
    this.service.getAllPatient().subscribe((result: IPatient[]) => {
      this.Patients = result;
      console.log(this.Patients);
    });
  }

  Save() {
    console.log(this.patientForm.value);
    const Patient: IPatient = {
      Id: this.patientForm.value.Id!,
      Name: this.patientForm.value.Name!,
      Gender: this.patientForm.value.Gender!,
      ContactNo: this.patientForm.value.ContactNo!,
      ChiefComplain: this.patientForm.value.ChiefComplain!,
      DifferentDiagonosis: this.patientForm.value.DifferentDiagonosis!,
      LabratoryFindings: this.patientForm.value.LabratoryFindings!,
      MemberId:this.patientForm.value.MemberId!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(Patient);
      this.service.updatePatient(Patient).subscribe((r) => {
        console.log(r);
         this.router.navigateByUrl('/pages/crud/patientlist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      if(this.service.createPatient(Patient).subscribe(
        (result) => console.log(result))){
          this.RefreshList();
        console.log('success');
        this.router.navigateByUrl('/pages/crud/patientlist');
        
      }
        
        
       
      
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }
}

