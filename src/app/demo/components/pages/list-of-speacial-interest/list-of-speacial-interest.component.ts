import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ISpeacialInterest } from 'src/app/api/ISpeacialInterest.model';
import { SpeacialInterestService } from 'src/app/Services/speacial-interest.service';

@Component({
  selector: 'app-list-of-speacial-interest',
  standalone: true,
  imports: [TableModule,RouterLink,MatIconModule,ButtonModule],
  templateUrl: './list-of-speacial-interest.component.html',
  styleUrl: './list-of-speacial-interest.component.scss'
})
export class ListOfSpeacialInterestComponent {
  exportColumns: any[];
  cols:any[]
  SpeacialInterestList:ISpeacialInterest[]=[];
  displayedColumns: string[] = ['Id', 'Name','Action'];
  constructor(private router: Router,
  private http: SpeacialInterestService) {}
  ngOnInit() {
   // debugger
    this.http.getAllSpeacialInterest().subscribe((result: ISpeacialInterest[]) => {
      this.SpeacialInterestList = result;
      console.log(this.SpeacialInterestList);
    });
    this.cols = [
      { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
      { field: 'Name', header: 'Name' }
  ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(SpeacialInterestId: number) {
    this.http.deleteSpeacialInterest(SpeacialInterestId).subscribe(() => {
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


