// import { Component, inject } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { IAddress_info } from 'src/app/api/IAddress_info.model';
// import { IMember } from 'src/app/api/IMember.model';
// import { AddressInfoService } from 'src/app/Services/address-info.service';
// import { MemberService } from 'src/app/Services/member.service';

// @Component({
//   selector: 'app-add-member',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-member.component.html',
//   styleUrl: './add-member.component.scss'
// })
// export class AddMemberComponent {
//   service =inject(MemberService);
//   address_srv= inject(AddressInfoService)
//   builder = inject(FormBuilder);
//   router = inject(Router);
//   route = inject(ActivatedRoute);
//   // toaster = inject(ToastrService);
 
//   Members:IMember[]=[];
//   singlemember:IMember | undefined;
//   Addresses:IAddress_info[]=[]
//   Selectedaddress!:IAddress_info
//   submitted = false;
//   memberForm = this.builder.group({
//     Id: [0],
//     FirstName: ['', [Validators.required]],
//     Lastname: ['', [Validators.required]],
//     ContactNo: ['', [Validators.required]],
//     Email: ['', [Validators.required,Validators.email]],
//     Age: [0, [Validators.required]],
//     Nid: ['', [Validators.required]],
//     PicPath: ['', [Validators.required]],
//     AddressInfoId: [0, [Validators.required]]
//   });

//   memberId!: number;
//   isEdit = false;

//   ngOnInit() {
//     debugger
//     this.memberId = this.route.snapshot.params['Id'];
//     if (this.memberId) {
//       this.isEdit = true;
//       this.service.getMember(this.memberId).subscribe((result) => {
//         console.log(result);
//         this.memberForm.patchValue(result);
        
//       });
//     }
//     this.getAddress();
    
//   }

//   getAddress(){ this.address_srv.getAllAddress().subscribe((r:IAddress_info[])=>{
//     this.Addresses=r
//     console.log("all address" ,r)
//     })
//   }
//   RefreshList(){
//     this.service.getAllMember().subscribe((result: IMember[]) => {
//       this.Members = result;
//       console.log(result);
//     });
//   }

//   Save() {
//     console.log(this.memberForm.value);
//     const member: IMember = {
//       Id: this.memberForm.value.Id!,
//       FirstName: this.memberForm.value.FirstName!,
//       Lastname: this.memberForm.value.Lastname!,
//       ContactNo: this.memberForm.value.ContactNo!,
//       Email: this.memberForm.value.Email!,
//       Age: this.memberForm.value.Age!,
//       Nid: this.memberForm.value.Nid,
//       PicPath: this.memberForm.value.PicPath!,
//       AddressInfoId: this.memberForm.value.AddressInfoId!
//     };
//     //Edit

//     if (this.isEdit) {
//       debugger
//       console.log(member);
//       this.service.updateMember(member).subscribe((r) => {
//         console.log(r);
//          this.router.navigateByUrl('/pages/crud/memberlist');
//         // this.toaster.info('Record Updated Successfully');
//       });
//     } else {
//       this.service.createMember(member).subscribe(
//         (result) => console.log(result)
        
//       );
//       this.RefreshList();
//       console.log('success');
//       this.router.navigateByUrl('/pages/crud/memberlist');
//       // this.toaster.success('Record created Successfully');
//     //}
//   }
  
//   }

//   loadAddresses() {
//     this.address_srv.getAllAddress().subscribe(
//       data => {
//         this.Addresses = data.map(address => ({
//           ...address,
//           CountryName: address.CountryId ? address.CountryId : 'Unknown',
//           DivisionName: address.Division ? address.Division.Name : 'Unknown'
//         }));
//       },
//       error => {
//         console.error('Error fetching addresses', error);
//       }
//     );
//   }

//   trackByFn(index: number, item: any) {
//     return item.Id; // unique id corresponding to the item
//   }


// }
