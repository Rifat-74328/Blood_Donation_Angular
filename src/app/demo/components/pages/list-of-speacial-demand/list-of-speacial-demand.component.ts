import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ISpeacialDemand } from 'src/app/api/ISpeacialDemand.model';
import { SpeacialDemandService } from 'src/app/Services/SpeacialDemand.service';

@Component({
  selector: 'app-list-of-speacial-demand',
  standalone: true,
  imports: [TableModule,MatIconModule,TooltipModule,RouterLink,ButtonModule],
  templateUrl: './list-of-speacial-demand.component.html',
  styleUrl: './list-of-speacial-demand.component.scss'
})
export class ListOfSpeacialDemandComponent {
  exportColumns: any[];
  cols:any[]
  SpeacialDemandList:ISpeacialDemand[]=[];
  displayedColumns: string[] = ['Id', 'Demands','Action'];
  constructor(private router: Router,
  private http: SpeacialDemandService) {}
  ngOnInit() {
   // debugger
    this.http.getAllSpeacialDemand().subscribe((result: ISpeacialDemand[]) => {
      this.SpeacialDemandList = result;
      console.log(this.SpeacialDemandList);
    });
    this.cols = [
      { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
      { field: 'Name', header: 'Name' }
  ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(SpeacialDemandId: number) {
    this.http.deleteSpeacialDemand(SpeacialDemandId).subscribe(() => {
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

