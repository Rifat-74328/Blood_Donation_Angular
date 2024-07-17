import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IDisease } from 'src/app/api/IDisease.model';
import { DiseaseService } from 'src/app/Services/disease.service';

@Component({
  selector: 'app-list-of-disease',
  standalone: true,
  imports: [TableModule,TooltipModule,ButtonModule,RouterLink,MatIconModule],
  templateUrl: './list-of-disease.component.html',
  styleUrl: './list-of-disease.component.scss'
})
export class ListOfDiseaseComponent {
  exportColumns: any[];
  cols:any[]
  diseaseList:IDisease[]=[];
  displayedColumns: string[] = ['countryId', 'countryName','Action'];
  constructor(private router: Router,
  private http: DiseaseService) {}
  ngOnInit() {
   // debugger
    this.http.getAllDisease().subscribe((result: IDisease[]) => {
      this.diseaseList = result;
      console.log(this.diseaseList);
    });
    this.cols = [
      { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
      { field: 'Name', header: 'Name' }
  ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(Id: number) {
    this.http.deleteDisease(Id).subscribe(() => {
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

