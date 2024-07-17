import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Ibloodgroup } from 'src/app/api/Ibloodgroup.model';
import { IBloodRequest } from 'src/app/api/IBloodRequest.model';
import { IMember } from 'src/app/api/IMember.model';
import { BloodGroupService } from 'src/app/Services/bloodgroup.service';
import { BloodRequestService } from 'src/app/Services/bloodrequest.service';
import { MemberService } from 'src/app/Services/member.service';

@Component({
  selector: 'app-list-of-blood-req',
  standalone: true,
  imports: [FormsModule,ButtonModule,TableModule,RouterLink,MatIconModule,CommonModule],
  templateUrl: './list-of-blood-req.component.html',
  styleUrl: './list-of-blood-req.component.scss'
})
export class ListOfBloodReqComponent {
  exportColumns: any[];
  cols:any[];
  requestList:IBloodRequest[]
  groupList:Ibloodgroup[]=[];
  mamberList:IMember[]=[];
  displayedColumns: string[] = ['Id', 'PatientName','PatientPhone','AttendentPhone','PatientAddress','PatientDisease','BloodQty','DonationDate','BloodGroupId','ReferenceId','Action'];
  constructor(private router: Router,
  private http:BloodRequestService ,
  private grp_srv: BloodGroupService,
  private member_srv: MemberService
) {}
  ngOnInit() {
   // debugger
    this.http.getAllReq().subscribe((r:IBloodRequest[])=>{
        debugger
        this.requestList=r;
        console.log(r)
    })

    this.grp_srv.getAllBloodGroup().subscribe(result=>{
        this.groupList=result
    })
    this.member_srv.getAllMember().subscribe((r)=>{
      this.mamberList=r
    })
    
    

//     this.cols = [
//       { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
//       { field: 'Name', header: 'Name' }
//   ];
//     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  getGroupName(id?: number): string {
    debugger
    const group = this.groupList.find(c => c.Id === id);
    return group ? group.Name : 'Unknown';
  }
  getMemberName(id?: number): string {
    debugger
    const member = this.mamberList.find(c => c.Id === id);
    return member ? member.Name : 'Unknown';
  }

  
  Delete(Id: number) {
    this.http.deleteReq(Id).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

//   exportPdf() {
//     const doc = new jsPDF();
//     doc.autoTable(this.exportColumns, this.districtList);
//     doc.save('Country.pdf');
// }


}