import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IAreaofConsultation } from 'src/app/api/IAreaofConsultation.model';
import { AreaOfConsultationService } from 'src/app/Services/area-of-consultation.service';

@Component({
  selector: 'app-list-of-area-of-consultation',
  standalone: true,
  imports: [TableModule,ButtonModule,TooltipModule,RouterLink,MatIconModule],
  templateUrl: './list-of-area-of-consultation.component.html',
  styleUrl: './list-of-area-of-consultation.component.scss'
})
export class ListOfAreaOfConsultationComponent {
  exportColumns: any[];
  cols:any[]
  AreaList:IAreaofConsultation[]=[];
  displayedColumns: string[] = ['Id', 'Name','Action'];
  constructor(private router: Router,
  private http: AreaOfConsultationService) {}
  ngOnInit() {
   // debugger
    this.http.getAllAreaOfConsultation().subscribe((result: IAreaofConsultation[]) => {
      this.AreaList = result;
      console.log(this.AreaList);
    });
    this.cols = [
      { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
      { field: 'Name', header: 'Name' }
  ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(areaId: number) {
    this.http.deleteAreaOfConsultation(areaId).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

//   exportPdf() {
//     const doc = new jsPDF();
//     doc.autoTable(this.exportColumns, this.countryList);
//     doc.save('Country.pdf');
// }


}
