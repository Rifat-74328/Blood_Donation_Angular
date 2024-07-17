import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Ibloodgroup } from 'src/app/api/Ibloodgroup.model';
import { IBloodRequest } from 'src/app/api/IBloodRequest.model';
import { IMember } from 'src/app/api/IMember.model';
import { BloodGroupService } from 'src/app/Services/bloodgroup.service';
import { BloodRequestService } from 'src/app/Services/bloodrequest.service';
import { MemberService } from 'src/app/Services/member.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-add-blood-req',
  standalone: true,
  imports: [FormsModule,RouterLink,ReactiveFormsModule,MatSelectModule,MatNativeDateModule,MatInputModule,MatDatepickerModule],
  templateUrl: './add-blood-req.component.html',
  styleUrl: './add-blood-req.component.scss'
})
export class AddBloodReqComponent {

  builder = inject(FormBuilder);
  mem_srv = inject(MemberService);
  bl_srv= inject(BloodGroupService)
  srv     = inject(BloodRequestService)
  router  = inject(Router);
  route   = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  reqList:IBloodRequest[]=[];
  members:IMember[]=[]
  groups:Ibloodgroup[]=[]
  submitted = false;
  reqForm = this.builder.group({
    Id: [0],
    PatientName: ['', [Validators.required]],
    PatientPhone: ['', [Validators.required]],
    AttendentPhone: ['', [Validators.required]],
    PatientAddress: ['', [Validators.required]],
    PatientDisease: ['', [Validators.required]],
    BloodQty: [0, [Validators.required]],
    DonationDate: [new Date, [Validators.required]],
    BloodGroupId: [0, [Validators.required]],
    ReferenceId: [0, [Validators.required]],
  });

  reqId!: number;
  isEdit = false;

  ngOnInit() {
    debugger
    this.reqId = this.route.snapshot.params['Id'];
    if (this.reqId) {
      this.isEdit = true;
      this.srv.getReq(this.reqId).subscribe((result) => {
        console.log(result);
        this.reqForm.patchValue(result);
        
      });
    }
    this.getMember();
    this.getGroup();
    
  }

  getMember(){ this.mem_srv.getAllMember().subscribe((r:IMember[])=>{
    this.members=r
    console.log("members" ,r)
    })
  }
  getGroup(){ this.bl_srv.getAllBloodGroup().subscribe((r:Ibloodgroup[])=>{
    this.groups=r
    console.log("groups" ,r)
    })
  }

  RefreshList(){
    this.srv.getAllReq().subscribe((result: IBloodRequest[]) => {
      this.reqList = result;
      console.log(result);
    });
  }

  Save() {
    console.log(this.reqForm.value);
    const req: IBloodRequest = {
      Id: this.reqForm.value.Id!,
      PatientName: this.reqForm.value.PatientName!,
      PatientPhone:this.reqForm.value.PatientPhone!,
      AttendentPhone:this.reqForm.value.AttendentPhone!,
      PatientAddress:this.reqForm.value.PatientAddress!,
      PatientDisease:this.reqForm.value.PatientDisease!,
      BloodQty:this.reqForm.value.BloodQty!,
      DonationDate:new Date(this.reqForm.value.DonationDate!),
      BloodGroupId:this.reqForm.value.BloodGroupId!,
      ReferenceId:this.reqForm.value.ReferenceId!,
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(req);
      this.srv.updateReq( req).subscribe((r) => {
        console.log(r);
         this.router.navigateByUrl('/pages/crud/reqlist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      this.srv.createReq(req).subscribe(
        (result) => 
        console.log(result)
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/reqlist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
