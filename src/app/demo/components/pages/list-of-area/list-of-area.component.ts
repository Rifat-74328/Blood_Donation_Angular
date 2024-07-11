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
import { IArea } from 'src/app/api/IArea.model';
import { IThana } from 'src/app/api/IThana.model';
import { AreaService } from 'src/app/Services/area.service';
import { ThanaService } from 'src/app/Services/thana.service';


@Component({
  selector: 'app-list-of-district',
  standalone: true,
  imports: [MatTableModule,TableModule,MatIconModule,RouterLink,MatButtonModule,TooltipModule,ButtonModule],

  templateUrl: './list-of-area.component.html',
  styleUrl: './list-of-area.component.css'
})
export class ListOfAreaComponent {
  exportColumns: any[];
  cols:any[];
  areaList:IArea[]
  thanaList:IThana[]=[];
  displayedColumns: string[] = ['Id', 'Name','ThanaId','Action'];
  constructor(private router: Router,
  private http:AreaService ,
  private t_srv: ThanaService) {}
  ngOnInit() {
   // debugger
    this.http.getAllArea().subscribe((r:IArea[])=>{
        debugger
        this.areaList=r;
        console.log(r)
    })

    this.t_srv.getAllThana().subscribe(result=>{
        this.thanaList=result
    })
    
    

//     this.cols = [
//       { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
//       { field: 'Name', header: 'Name' }
//   ];
//     this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }

  getThanaName(id?: number): string {
    debugger
    const thana = this.thanaList.find(c => c.Id === id);
    return thana ? thana.Name : 'Unknown';
  }
  
  Delete(Id: number) {
    debugger
    this.http.deleteArea(Id).subscribe(() => {
      console.log("deleted")
      this.ngOnInit();
      // this.toaster.error("Record deleted Successfully");
    })
  }

  exportPdf() {
    const doc = new jsPDF();
    doc.autoTable(this.exportColumns, this.areaList);
    doc.save('Country.pdf');
}


}
