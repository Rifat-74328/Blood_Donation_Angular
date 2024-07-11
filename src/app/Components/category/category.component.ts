import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CategorService } from 'src/app/Services/categor.service';
import { Category } from 'src/app/api/category.model';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ CommonModule, ToastModule,ToolbarModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule
  ],
  providers:[MessageService],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  catDialog: boolean = false;
  deleteCatDialog: boolean = false;
  deleteCatsDialog: boolean = false;
  categories: Category[] = [];
  category: Category = {
    Id: 0,
    CategoryName: ''
  };
  selectedcategories: Category[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private catSrv: CategorService, private messageService: MessageService) { }
  ngOnInit(): void {
    this.catSrv.getAll().subscribe({
      next:(data)=>{
          console.log(data)
          this.categories=data
      }
    })
    this.cols = [
        // { field: 'product', header: 'Product' },
        { field: 'Id', header: 'Id' },
        { field: 'CategoryName', header: 'CategoryName' },
        // { field: 'rating', header: 'Reviews' },
        // { field: 'inventoryStatus', header: 'Status' }
    ];

    this.statuses = [
        { label: 'INSTOCK', value: 'instock' },
        { label: 'LOWSTOCK', value: 'lowstock' },
        { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];
  }
  openNew() {
    this.category = { 
      Id: 0,
    CategoryName: ''};
    this.submitted = false;
    this.catDialog = true;
}

deleteSelectedProducts() {
    this.deleteCatsDialog = true;
}

editProduct(cat: Category) {
    this.category = { ...cat };
    this.catDialog = true;
    console.log(cat)
}

deleteProduct(cat: Category) {
    this.deleteCatDialog = true;
    this.category = { ...cat };
    
}

confirmDeleteSelected() {
    this.deleteCatsDialog = false;
    this.categories = this.categories.filter(val => !this.selectedcategories.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedcategories = [];
}

confirmDelete() {
    this.deleteCatDialog = false;
    // this.categories = this.categories.filter(val => val.Id !== this.category.Id);
    this.catSrv.delete(this.category.Id).subscribe({
        next:(r)=>{
            this.ngOnInit()
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            this.category = {
              Id: 0,
              CategoryName: ''
            };
        }
    })
   
}

hideDialog() {
    this.catDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;
   // debugger;
    if (this.category.CategoryName?.trim()) {
        if (this.category.Id) {
            
            // this.categories[this.findIndexById(this.category.Id)] = this.category;
            
            this.catSrv.update( this.category).subscribe({
                next:(r)=>{
                    this.ngOnInit();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                },error:(er)=>{
                    console.log(er)
                }
            })
           
        } else {
            //this.category.Id = this.createId();
             
            console.log(this.category)
            //this.categories.push(this.category);
            let obj={
                CategoryName:this.category.CategoryName
            }
            this.catSrv.create(obj).subscribe({
                next:(r)=>{
                    this.ngOnInit();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product created', life: 3000 });
                },error:(er)=>{
                    console.log(er)
                }
            })
           
        }

        this.categories = [...this.categories];
        this.catDialog = false;
        this.category = { Id: 0,
        CategoryName: ''};
    }
}

findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i].Id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
}
