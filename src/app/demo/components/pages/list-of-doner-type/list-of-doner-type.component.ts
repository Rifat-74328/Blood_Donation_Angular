import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { IDonerType } from 'src/app/api/IDonerType.model';import { DonerTypeService } from 'src/app/Services/donertype.service';
@Component({
  selector: 'app-list-of-doner-type',
  standalone: true,
  imports: [TableModule,ButtonModule,RouterLink,TooltipModule],
  templateUrl: './list-of-doner-type.component.html',
  styleUrl: './list-of-doner-type.component.scss'
})
export class ListOfDonerTypeComponent implements OnInit {
  exportColumns: any[];
  cols:any[];
  DonerTypeList:IDonerType[]
  displayedColumns: string[] = ['Id', 'DonerType','Action'];
  constructor(private router: Router,
  private http: DonerTypeService) {}
  ngOnInit() {
   // debugger
    this.http.getAllDonerType().subscribe((result: IDonerType[]) => {
      this.DonerTypeList = result;
      console.log(this.DonerTypeList);
    });

    
    

//     this.cols = [
//       { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
//       { field: 'Name', header: 'Name' }
//   ];
//     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  
  
  Delete(Id: number) {
    debugger
    this.http.deleteDonerType(Id).subscribe(() => {
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
