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
import { ICountry } from 'src/app/api/ICountry.model';


@Component({
  selector: 'app-list-of-division',
  standalone: true,
  imports: [MatTableModule,TableModule,MatIconModule,RouterLink,MatButtonModule,TooltipModule,ButtonModule],

  templateUrl: './list-of-division.component.html',
  styleUrl: './list-of-division.component.scss'
})
export class ListOfDivisionComponent {
  exportColumns: any[];
  cols:any[];
  divisionList:IDivision[]
  countryList:ICountry[]=[];
  displayedColumns: string[] = ['Id', 'Name','CountryId','Action'];
  constructor(private router: Router,
  private http: DivisionService,
  private cntry_srv: CountryService) {}
  ngOnInit() {
   // debugger
    this.http.getAllDivision().subscribe((result: IDivision[]) => {
      this.divisionList = result;
      console.log(this.divisionList);
    });

    this.cntry_srv.getAllCountry().subscribe(result=>{
        this.countryList=result
    })
    
    

//     this.cols = [
//       { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
//       { field: 'Name', header: 'Name' }
//   ];
//     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  getCountryName(id?: number): string {
    debugger
    const country = this.countryList.find(c => c.Id === id);
    return country ? country.Name : 'Unknown';
  }
  
  Delete(Id: number) {
    debugger
    this.http.deleteDivision(Id).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

  exportPdf() {
    const doc = new jsPDF();
    doc.autoTable(this.exportColumns, this.countryList);
    doc.save('Country.pdf');
}


}
