import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';


import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
 
import { Table } from 'primeng/table';
import { MenuItem } from 'src/app/api/menu-item.model';
import { Category } from 'src/app/api/category.model';
import { CategorService } from 'src/app/Services/categor.service';
import { MenuService } from 'src/app/layout/app.menu.service';
import { ProductService } from 'src/app/Services/product.service';
import { RawmaterialService } from 'src/app/Services/rawmaterial.service';
import { RawMaterials } from 'src/app/api/raw-materials.model';
import { FoodIngrdientsService } from 'src/app/Services/food-ingrdients.service';
import { FoodIngridients } from 'src/app/api/food-ingridients.model';
import { Unit } from 'src/app/api/unit';
import { UnitService } from 'src/app/Services/unit.service';
 
 
@Component({
  selector: 'app-food-ingridients',
  standalone: true,
  imports: [CommonModule,
		FormsModule,
		ToolbarModule,
		ButtonModule,
		RippleModule,
		SplitButtonModule,
		AccordionModule,
		TabViewModule,
		FieldsetModule,
		MenuModule,
		InputTextModule,
		DividerModule,
		SplitterModule,
		PanelModule ,  ToastModule,TableModule,  DropdownModule],
    providers:[MessageService],
  templateUrl: './food-ingridients.component.html',
  styleUrl: './food-ingridients.component.scss'
})
export class FoodIngridientsComponent implements OnInit {
  constructor(private catsrv:CategorService, private entitySrv:ProductService,
    private rawsrv:RawmaterialService,
    private foodSrv:FoodIngrdientsService,
    private unitsrv:UnitService
  ){}
  entityDialog: boolean = false;
  categories:Category[]=[];
  category:Category={
    Id: 0,
    CategoryName: ''
  };
  rawItems:RawMaterials[];
  menuItem:MenuItem={
    UnitId: 0,
    ItemName: '',
    ItemDescription: '',
    CategoryId: 0,
    UnitPrice: 0,
    ImagePath: ''
  };
  units:Unit[];
  foodIngridients:FoodIngridients 
  insertFoodIngridient:FoodIngridients[];
  menuItems:MenuItem[];
  loadUnits(){
    this.unitsrv.getAll().subscribe({
      next:(data)=>{
        console.log("unti list")
          console.log(data)
          this.units=data
          console.log(this.units)
      },
      error:(er)=>{
          console.log(er)
      }
    })
  }
  loadMenuItem(id:number){
    this.entitySrv.getbyCat(id).subscribe({
      next:(data)=>{
        console.log("Menu list")
          console.log(data)
          this.menuItems=data
          console.log(this.menuItems)
      },
      error:(er)=>{
          console.log(er)
      }
    })
    
  


  }
  loadRawmaterials(){
    this.rawsrv.getAll().subscribe({
      next:(data)=>{
        console.log("raw list")
          console.log(data)
          this.rawItems=data
          console.log(this.rawItems)
      },
      error:(er)=>{
          console.log(er)
      }
    })
  }
  loadCategory(){
    this.catsrv.getAll().subscribe({
      next:(data)=>{
          console.log(data)
          this.categories=data
      }
    })
  }
  ngOnInit(): void {
    this.loadCategory();
   this.loadUnits();
   this.loadRawmaterials();
  }
  
  onChange(event){
    debugger;
    console.log()
    let catId = event.value;
    let domEvent = event.originalEvent;
    console.log(catId)
    this.loadMenuItem(catId)

  }
  clearAll(){}
  saveAll(){}
}
