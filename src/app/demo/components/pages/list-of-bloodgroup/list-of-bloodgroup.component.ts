import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Ibloodgroup } from 'src/app/api/Ibloodgroup.model';
import { BloodGroupService } from 'src/app/Services/bloodgroup.service';

@Component({
  selector: 'app-list-of-bloodgroup',
  standalone: true,
  imports: [TableModule,FormsModule,ButtonModule,RouterLink,MatIconModule],
  templateUrl: './list-of-bloodgroup.component.html',
  styleUrl: './list-of-bloodgroup.component.scss'
})
export class ListOfBloodgroupComponent {
  exportColumns: any[];
  cols:any[]
  groupList:Ibloodgroup[]=[];
  displayedColumns: string[] = ['Id', 'Name','Description','Action'];
  constructor(private router: Router,
  private http: BloodGroupService) {}
  ngOnInit() {
   // debugger
    this.http.getAllBloodGroup().subscribe((result: Ibloodgroup[]) => {
      this.groupList = result;
      console.log(this.groupList);
    });
  //   this.cols = [
  //     { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
  //     { field: 'Name', header: 'Name' }
  // ];
  //   this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(bloodId: number) {
    this.http.deleteBloodGroup(bloodId).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

//   exportPdf() {
//     const doc = new jsPDF();
//     doc.autoTable(this.exportColumns, this.groupList);
//     doc.save('Country.pdf');
// }


}
