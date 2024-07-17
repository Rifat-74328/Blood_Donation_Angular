import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IDegree } from 'src/app/api/IDegree.model';
import { DegreeService } from 'src/app/Services/degree.service';

@Component({
  selector: 'app-list-of-degree',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,TooltipModule,TableModule,MatIconModule,ButtonModule,RouterLink],
  templateUrl: './list-of-degree.component.html',
  styleUrl: './list-of-degree.component.scss'
})
export class ListOfDegreeComponent {
  exportColumns: any[];
  cols:any[]
  DegreeList:IDegree[]=[];
  displayedColumns: string[] = ['Id', 'Name','Action'];
  constructor(private router: Router,
  private http: DegreeService) {}
  ngOnInit() {
   // debugger
    this.http.getAllDegree().subscribe((result: IDegree[]) => {
      this.DegreeList = result;
      console.log(this.DegreeList);
    });
    this.cols = [
      { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
      { field: 'Name', header: 'Name' }
  ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(DegreeId: number) {
    this.http.deleteDegree(DegreeId).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

//   exportPdf() {
//     const doc = new jsPDF();
//     doc.autoTable(this.exportColumns, this.DegreeList);
//     doc.save('Degree.pdf');
// }


}
