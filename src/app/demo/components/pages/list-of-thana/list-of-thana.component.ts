import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { IDivision } from 'src/app/api/IDivision.model';
import { CountryService } from 'src/app/Services/country.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService, PrimeIcons } from 'primeng/api';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { IThana } from 'src/app/api/IThana.model';
import { IDistrict } from 'src/app/api/IDistrict.model';
import { ThanaService } from 'src/app/Services/thana.service';
import { DistrictService } from 'src/app/Services/district.service';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-list-of-thana',
  standalone: true,
  imports: [MatTableModule,TableModule,MatIconModule,RouterLink,MatButtonModule,TooltipModule,ButtonModule,ButtonModule,ToastModule],

  templateUrl: './list-of-thana.component.html',
  styleUrl: './list-of-thana.component.scss',
  providers: [MessageService]
})
export class ListOfThanaComponent {
  exportColumns: any[];
  cols:any[];
  thanaList:IThana[]
  districtList:IDistrict[]=[];
  displayedColumns: string[] = ['Id', 'Name','CountryId','Action'];
  constructor(private router: Router,
  private http: ThanaService,
  private dist_srv: DistrictService,private MessageService:MessageService) {}
  ngOnInit() {
   // debugger
    this.http.getAllThana().subscribe((result: IThana[]) => {
      this.thanaList = result;
      console.log(this.thanaList);
    });

    this.dist_srv.getAllDistrict().subscribe(result=>{
        this.districtList=result
    })
    this.show();
    

//     this.cols = [
//       { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
//       { field: 'Name', header: 'Name' }
//   ];
//     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  getDistrictName(id?: number): string {
    debugger
    const district = this.districtList.find(d => d.Id === id);
    return district ? district.Name : 'Unknown';
  }
  
  Delete(Id: number) {
    debugger
    this.http.deleteThana(Id).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

  exportPdf() {
    const doc = new jsPDF();
    doc.autoTable(this.exportColumns, this.thanaList);
    doc.save('Country.pdf');
}
show() {
  this.MessageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted' });
}


}
