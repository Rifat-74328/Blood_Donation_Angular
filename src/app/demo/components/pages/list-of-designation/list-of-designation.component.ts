import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IDesignation } from 'src/app/api/IDesignation.model';
import { DesignationService } from 'src/app/Services/designation.service';

@Component({
  selector: 'app-list-of-designation',
  standalone: true,
  imports: [TableModule,RouterLink,TooltipModule,ButtonModule,MatIconModule],
  templateUrl: './list-of-designation.component.html',
  styleUrl: './list-of-designation.component.scss'
})
export class ListOfDesignationComponent {
  exportColumns: any[];
  cols:any[]
  DesignationList:IDesignation[]=[];
  displayedColumns: string[] = ['Id', 'Name','Description','Action'];
  constructor(private router: Router,
  private http: DesignationService) {}
  ngOnInit() {
   // debugger
    this.http.getAllDesignation().subscribe((result: IDesignation[]) => {
      this.DesignationList = result;
      console.log(this.DesignationList);
    });
    this.cols = [
      { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
      { field: 'Name', header: 'Name' }
  ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(DesignationId: number) {
    this.http.deleteDesignation(DesignationId).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

//   exportPdf() {
//     const doc = new jsPDF();
//     doc.autoTable(this.exportColumns, this.DesignationList);
//     doc.save('Designation.pdf');
// }


}
