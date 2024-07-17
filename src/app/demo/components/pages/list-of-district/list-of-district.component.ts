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
import { PrimeIcons } from 'primeng/api';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DivisionService } from 'src/app/Services/division.service';
import { IDistrict } from 'src/app/api/IDistrict.model';
import { DistrictService } from 'src/app/Services/district.service';


@Component({
  selector: 'app-list-of-district',
  standalone: true,
  imports: [MatTableModule,TableModule,MatIconModule,RouterLink,MatButtonModule,TooltipModule,ButtonModule],

  templateUrl: './list-of-district.component.html',
  styleUrl: './list-of-district.component.css'
})
export class ListOfDistrictComponent {
  exportColumns: any[];
  cols:any[];
  divisionList:IDivision[]
  districtList:IDistrict[]=[];
  displayedColumns: string[] = ['Id', 'Name','DivisionId','Action'];
  constructor(private router: Router,
  private http:DistrictService ,
  private div_srv: DivisionService) {}
  ngOnInit() {
   // debugger
    this.http.getAllDistrict().subscribe((r:IDistrict[])=>{
        debugger
        this.districtList=r;
        console.log(r)
    })

    this.div_srv.getAllDivision().subscribe(result=>{
        this.divisionList=result
    })
    
    

//     this.cols = [
//       { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
//       { field: 'Name', header: 'Name' }
//   ];
//     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  getDivisionName(id?: number): string {
    debugger
    const division = this.divisionList.find(c => c.Id === id);
    return division ? division.Name : 'Unknown';
  }
  
  Delete(Id: number) {
    this.http.deleteDistrict(Id).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

  exportPdf() {
    const doc = new jsPDF();
    doc.autoTable(this.exportColumns, this.districtList);
    doc.save('Country.pdf');
}


}
