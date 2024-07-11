import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';
import { HomeComponent } from 'src/app/Components/home/home.component';
import { CategoryComponent } from 'src/app/Components/category/category.component';
import { MenuItemComponent } from 'src/app/Components/menu-item/menu-item.component';
import { FoodIngrdientsService } from 'src/app/Services/food-ingrdients.service';
import { FoodIngridientsComponent } from 'src/app/Components/food-ingridients/food-ingridients.component';
import { AddCountryComponent } from '../add-country/add-country.component';
import { ListOfCountryComponent } from '../list-of-country/list-of-country.component';
import { AddDivisionComponent } from '../add-division/add-division.component';
import { ListOfDivisionComponent } from '../list-of-division/list-of-division.component';
import { ListOfDistrictComponent } from '../list-of-district/list-of-district.component';
import { AddDistrictComponent } from '../add-district/add-district.component';
import { ListOfThanaComponent } from '../list-of-thana/list-of-thana.component';
import { AddThanaComponent } from '../add-thana/add-thana.component';
import { ListOfAreaComponent } from '../list-of-area/list-of-area.component';
import { AddAreaComponent } from '../add-area/add-area.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudComponent },
		{ path: 'home', component: HomeComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule) },
		{ path: 'cat', component: CategoryComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'menuitem', component: MenuItemComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)}
		,
		{ path: 'receipe', component: FoodIngridientsComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		// Country Componenet
		{ path: 'addcountry', component: AddCountryComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'countrylist', component: ListOfCountryComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addcountry/:Id', component: AddCountryComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Division Componenet
		{ path: 'adddivision', component: AddDivisionComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'divisionlist', component: ListOfDivisionComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'adddivision/:Id', component: AddDivisionComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// district Component
		{ path: 'adddistrict', component: AddDistrictComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'districtlist', component: ListOfDistrictComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'adddistrict/:Id', component: AddDistrictComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		// Thana Component
		{ path: 'addthana', component: AddThanaComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'thanalist', component: ListOfThanaComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addthana/:Id', component: AddThanaComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Area Component
		{ path: 'addarea', component: AddAreaComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'arealist', component: ListOfAreaComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addarea/:Id', component: AddAreaComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},




	])],
	exports: [RouterModule]
})
export class CrudRoutingModule { }
