import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IBloodReqInfo } from 'src/app/api/IBloodReqInfo.model';
import { BloodRequestInfoService } from 'src/app/Services/BloodReqInfo.service';
import { CountryService } from 'src/app/Services/country.service';

@Component({
  selector: 'app-list-of-blood-req-info',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,ButtonModule,RouterLink,TableModule],
  templateUrl: './list-of-blood-req-info.component.html',
  styleUrl: './list-of-blood-req-info.component.scss'
})
export class ListOfBloodReqInfoComponent implements OnInit {
  exportColumns: any[];
  cols:any[]
  infoList:IBloodReqInfo[]=[];
  displayedColumns: string[] = ['Id', 'DoctorsSlipPic','BloodRequestId','Action'];
  constructor(private router: Router,
  private http: BloodRequestInfoService) {}
  ngOnInit() {
   // debugger
    this.http.getAllReqInfo().subscribe((result: IBloodReqInfo[]) => {
      this.infoList = result;
      console.log(this.infoList);
    });
  //   this.cols = [
  //     { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
  //     { field: 'Name', header: 'Name' }
  // ];
  //   this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(infoId: number) {
    this.http.deleteReqInfo(infoId).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

  // exportPdf() {
  //   const doc = new jsPDF();
  //   doc.autoTable(this.exportColumns, this.countryList);
  //   doc.save('Country.pdf');
}



