import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { CrudComponent } from './crud.component';
import { HomeComponent } from 'src/app/Components/home/home.component';
import { CategoryComponent } from 'src/app/Components/category/category.component';
import { MenuItemComponent } from 'src/app/Components/menu-item/menu-item.component';
import { FoodIngrdientsService } from 'src/app/Services/food-ingrdients.service';
import { FoodIngridientsComponent } from 'src/app/Components/food-ingridients/food-ingridients.component';
import { AddCountryComponent } from './add-country.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: 'addcountry', component: AddCountryComponent }
		,
		{ path: 'home', component: HomeComponent,loadChildren: () => import("./add-country.module").then(m => m.CrudModule) },
		{ path: 'cat', component: CategoryComponent,loadChildren: () => import("./add-country.module").then(m => m.CrudModule)},
		{ path: 'menuitem', component: MenuItemComponent,loadChildren: () => import("./add-country.module").then(m => m.CrudModule)}
		,
		{ path: 'receipe', component: FoodIngridientsComponent,loadChildren: () => import("./add-country.module").then(m => m.CrudModule)}
	])],
	exports: [RouterModule]
})
export class addcountryRoutingModule { }
