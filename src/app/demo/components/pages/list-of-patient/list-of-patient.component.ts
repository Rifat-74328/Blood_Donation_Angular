import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IMember } from 'src/app/api/IMember.model';
import { IPatient } from 'src/app/api/IPatient.model';
import { MemberService } from 'src/app/Services/member.service';
import { PatientService } from 'src/app/Services/patient.service';

@Component({
  selector: 'app-list-of-patient',
  standalone: true,
  imports: [TableModule,FormsModule,ReactiveFormsModule,TooltipModule,ButtonModule,RouterLink,MatIconModule],
  templateUrl: './list-of-patient.component.html',
  styleUrl: './list-of-patient.component.css'
})
export class ListOfPatientComponent {
  exportColumns: any[];
  cols:any[];
  PatientList:IPatient[]
  MemberList:IMember[]=[];
  displayedColumns: string[] = ['Id', 'Name','Gender','ContactNo','ChiefComplain','DifferentDiagonosis','LabratoryFindings','MemberId','Action'];
  constructor(private router: Router,
  private http:PatientService ,
  private M_srv: MemberService) {}
  ngOnInit() {
   // debugger
    this.http.getAllPatient().subscribe((r:IPatient[])=>{
        //debugger
        this.PatientList=r;
        console.log(r)
    })

    this.M_srv.getAllMember().subscribe(result=>{
        this.MemberList=result
    })
    
    

//     this.cols = [
//       { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
//       { field: 'Name', header: 'Name' }
//   ];
//     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  getMemberName(id?: number): string {
    debugger
    const Member = this.MemberList.find(m => m.Id === id);
    return Member ? Member.Name : 'Unknown';
  }
  
  Delete(Id: number) {
    debugger
    this.http.deletePatient(Id).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

//   exportPdf() {
//     const doc = new jsPDF();
//     doc.autoTable(this.exportColumns, this.areaList);
//     doc.save('Country.pdf');
// }


}
