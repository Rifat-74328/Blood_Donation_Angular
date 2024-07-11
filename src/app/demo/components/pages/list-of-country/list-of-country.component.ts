// import { Component, OnInit } from '@angular/core';
// import { MessageService, SelectItem } from 'primeng/api';
// import { CommonModule } from '@angular/common';
// import { ProductService } from 'src/app/Services/product.service';
// import { MenuItem } from 'src/app/api/menu-item.model';
// import { ToastModule } from 'primeng/toast';
// import { DialogModule } from 'primeng/dialog';
// import { DropdownModule } from 'primeng/dropdown';
// import { TableModule } from 'primeng/table';
// import { ToolbarModule } from 'primeng/toolbar';
// import { Table } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { InputTextModule } from 'primeng/inputtext';
// import { UnitService } from 'src/app/Services/unit.service';
// import { CategorService } from 'src/app/Services/categor.service';
// import { Category } from 'src/app/api/category.model';
// import { Unit } from 'src/app/api/unit';
// import { FormsModule } from '@angular/forms';
// import {MatTableModule} from '@angular/material/table';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
// import { RouterLink } from '@angular/router';
// import { TooltipModule } from 'primeng/tooltip';

// @Component({
//   selector: 'app-list-of-country',
//   standalone: true,
//   imports: [ FormsModule, CommonModule,ButtonModule, ToastModule,ToolbarModule,DialogModule,TableModule,  InputTextModule,DropdownModule,MatTableModule,MatIconModule,RouterLink,MatButtonModule,TooltipModule,ToastModule],

//   templateUrl: './list-of-country.component.html',
//   styleUrl: './list-of-country.component.scss'
// })
// export class ListOfCountryComponent {

//  categories:Category[]=[];
//  units:Unit[]=[];
//   entityDialog: boolean = false;
//   deleteCatDialog: boolean = false;
//   deleteCatsDialog: boolean = false;
//   entities: MenuItem[] = [];
//   entity: MenuItem ;
//   selectedcategories: MenuItem[] = [];
//   submitted: boolean = false;
//   cols: any[] = [];
//   statuses: any[] = [];

//   rowsPerPageOptions = [5, 10, 20];

  
//   selectedUnit: Unit = this.units[0];
//   constructor(private entitySrv: ProductService, private messageService: MessageService,
//     private unitsrv:UnitService,
//     private catsrv:CategorService,
    
//   ) { }
//   loadMenuItem(){
//     this.entitySrv.getAll().subscribe({
//       next:(data)=>{
//         console.log("Menu list")
//           console.log(data)
//           this.entities=data
//           console.log(this.entities)
//       }
//     })
    
//     this.cols = [
     
//       { field: 'ItemName', header: 'ItemName' },
//      { field: 'ItemDescription', header: 'ItemDescription' },
//      { field: 'CategoryName', header: 'CategoryName' },
//       { field: 'UnitPrice', header: 'UnitPrice' },
//       { field: 'ImagePath', header: 'ImagePath' }
//  ];

//  this.statuses = [
//      { label: 'INSTOCK', value: 'instock' },
//      { label: 'LOWSTOCK', value: 'lowstock' },
//      { label: 'OUTOFSTOCK', value: 'outofstock' }
//  ];
//   }
//   loadCategory(){
//     this.catsrv.getAll().subscribe({
//       next:(data)=>{
//           console.log(data)
//           this.categories=data
//       }
//     })
//   }
//   loadUnit(){
//     this.unitsrv.getAll().subscribe({
//       next:(data)=>{
//           console.log(data)
//           this.units=data
//       }
//     })
//   }
//   ngOnInit(): void {
//     this.loadMenuItem();
// this.loadCategory();
// this.loadUnit();
//   }
//   openNew() {
//     this.entity = { 
//       Id:null,
//       UnitId:0,
//     ItemName: '',
//     ItemDescription: '',
//     CategoryId: 0,
//     UnitPrice: 0,
//     ImagePath: ''
//     };
//     this.submitted = false;
//     this.entityDialog = true;
// }

// deleteSelectedProducts() {
//     this.deleteCatsDialog = true;
// }

// editProduct(cat: MenuItem) {
//     this.entity = { ...cat };
//     this.entityDialog = true;
//     console.log(cat)
// }

// deleteProduct(cat: MenuItem) {
//     this.deleteCatDialog = true;
//     this.entity = { ...cat };
    
// }

// confirmDeleteSelected() {
//     this.deleteCatsDialog = false;
//     this.entities = this.entities.filter(val => !this.selectedcategories.includes(val));
//     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
//     this.selectedcategories = [];
// }

// confirmDelete() {
//     this.deleteCatDialog = false;
//     // this.categories = this.categories.filter(val => val.Id !== this.category.Id);
//     this.entitySrv.delete(this.entity.Id).subscribe({
//         next:(r)=>{
//             this.ngOnInit()
//             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
//             this.entity = {
//               Id:null,
//               UnitId:0,
//     ItemName: '',
//     ItemDescription: '',
//     CategoryId: 0,
//     UnitPrice: 0,
//     ImagePath: ''
//             };
//         }
//     })
   
// }

// hideDialog() {
//     this.entityDialog = false;
//     this.submitted = false;
// }

// saveEntity() {
//   alert("s")
//     this.submitted = true;
//     console.log(this.selectedUnit)
//    // debugger;
//     //if (this.entity.ItemName?.trim()) {
//         if (this.entity.Id) {
//             this.entitySrv.update( this.entity).subscribe({
//                 next:(r)=>{
//                     this.ngOnInit();
//                     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
//                 },error:(er)=>{
//                     console.log(er)
//                 }
//             })
           
//         } else {

             
//             console.log(this.entity)
//             //  let obj={
//             //     CategoryName:this.entity.ItemName
//             // }
//             this.entitySrv.create(this.entity).subscribe({
//                 next:(r)=>{
//                     this.ngOnInit();
//                     this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product created', life: 3000 });
//                 },error:(er)=>{
//                     console.log(er)
//                 }
//             })
           
//         }

//         this.entities = [...this.entities];
//         this.entityDialog = false;
//         this.entity = { Id:null,UnitId:0,
//           ItemName: '',
//           ItemDescription: '',
//           CategoryId: 0,
//           UnitPrice: 0,
//           ImagePath: ''};
//     //}
// }

// findIndexById(id: number): number {
//     let index = -1;
//     for (let i = 0; i < this.entities.length; i++) {
//         if (this.entities[i].Id === id) {
//             index = i;
//             break;
//         }
//     }

//     return index;
// }

// // createId(): string {
// //     let id = '';
// //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// //     for (let i = 0; i < 5; i++) {
// //         id += chars.charAt(Math.floor(Math.random() * chars.length));
// //     }
// //     return id;
// // }

// onGlobalFilter(table: Table, event: Event) {
//     table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
// }

// }


import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ICountry } from 'src/app/api/ICountry.model';
import { CountryService } from 'src/app/Services/country.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PrimeIcons } from 'primeng/api';
import jsPDF from "jspdf";
import "jspdf-autotable";


@Component({
  selector: 'app-list-of-country',
  standalone: true,
  imports: [MatTableModule,TableModule,MatIconModule,RouterLink,MatButtonModule,TooltipModule,ButtonModule],

  templateUrl: './list-of-country.component.html',
  styleUrl: './list-of-country.component.scss'
})
export class ListOfCountryComponent {
  exportColumns: any[];
  cols:any[]
  countryList:ICountry[]=[];
  displayedColumns: string[] = ['countryId', 'countryName','Action'];
  constructor(private router: Router,
  private http: CountryService) {}
  ngOnInit() {
   // debugger
    this.http.getAllCountry().subscribe((result: ICountry[]) => {
      this.countryList = result;
      console.log(this.countryList);
    });
    this.cols = [
      { field: 'Id', header: 'Id', customExportHeader: 'Product Code' },
      { field: 'Name', header: 'Name' }
  ];
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  
  Delete(countryId: number) {
    this.http.deleteCountry(countryId).subscribe(() => {
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
