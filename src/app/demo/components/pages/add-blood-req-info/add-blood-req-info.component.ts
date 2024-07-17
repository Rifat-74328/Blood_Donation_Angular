import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IBloodReqInfo } from 'src/app/api/IBloodReqInfo.model';
import { IBloodRequest } from 'src/app/api/IBloodRequest.model';
import { BloodRequestInfoService } from 'src/app/Services/BloodReqInfo.service';
import { BloodRequestService } from 'src/app/Services/bloodrequest.service';

@Component({
  selector: 'app-add-blood-req-info',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './add-blood-req-info.component.html',
  styleUrl: './add-blood-req-info.component.scss'
})
export class AddBloodReqInfoComponent {

  builder = inject(FormBuilder);
  service = inject(BloodRequestInfoService);
  req_srv= inject(BloodRequestService)
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  infos:IBloodReqInfo[]=[];
  singleinfo:IBloodReqInfo | undefined;
  requests:IBloodRequest[]=[]
  ids:number[]=[];
  submitted = false;
  infoForm = this.builder.group({
    Id: [0],
    DoctorsSlipPic: ['',[Validators.required]],
    BloodRequestId:[0,[Validators.required]]
  });

  infoId!: number;
  isEdit = false;

  ngOnInit() {
    this.infoId = this.route.snapshot.params['Id'];
    if (this.infoId) {
      this.isEdit = true;
      this.service.getReqInfo(this.infoId).subscribe((result) => {
        console.log(result);
        this.infoForm.patchValue(result);
        
      });
    }

    this.req_srv.getAllReq().subscribe((r: IBloodRequest[]) => {
      this.requests = r;
      this.ids = this.requests.map(request => request.Id);
      console.log(this.ids); // Log the array of Ids
    });
    
    
  }
  RefreshList(){
    this.service.getAllReqInfo().subscribe((result: IBloodReqInfo[]) => {
      this.infos = result;
      console.log(this.infos);
    });
  }

  Save() {
    console.log(this.infoForm.value);
    const info: IBloodReqInfo = {
      Id: this.infoForm.value.Id!,
      DoctorsSlipPic: this.infoForm.value.DoctorsSlipPic!,
      BloodRequestId: this.infoForm.value.BloodRequestId!
    };
    //Edit
    const matchingRequest = this.requests.find(x => x.Id == this.infoForm.value.BloodRequestId!);

    if (this.isEdit) {
      debugger
      if(matchingRequest){
        console.log(info);
        this.service.updateReqInfo( info).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/infolist');
        // this.toaster.info('Record Updated Successfully');
      });
      }else{
        alert("Request Id Not Found")
      }
      
    } else {
      debugger
      
      if(matchingRequest){
            this.service.createReqInfo(info).subscribe(
            (result) => console.log(result));
            this.RefreshList();
            console.log('success');
            this.router.navigateByUrl('/pages/crud/infolist');
      }else{
        alert("Request Id Not Found")
      }
      
     
      
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}

//in create condition is not working.Id cant match