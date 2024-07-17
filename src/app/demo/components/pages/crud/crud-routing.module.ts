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
import { ListOfAddressComponent } from '../list-of-address/list-of-address.component';
import { AddAddresComponent } from '../add-addres/add-addres.component';
import { ListOfBloodgroupComponent } from '../list-of-bloodgroup/list-of-bloodgroup.component';
import { AddBloodgroupComponent } from '../add-bloodgroup/add-bloodgroup.component';
import { BloodGroupService } from 'src/app/Services/bloodgroup.service';
import { ListOfBloodReqComponent } from '../list-of-blood-req/list-of-blood-req.component';
import { AddBloodReqComponent } from '../add-blood-req/add-blood-req.component';
import { AddBloodReqInfoComponent } from '../add-blood-req-info/add-blood-req-info.component';
import { ListOfBloodReqInfoComponent } from '../list-of-blood-req-info/list-of-blood-req-info.component';
import { AddDonerTypeComponent } from '../add-doner-type/add-doner-type.component';
import { ListOfDonerTypeComponent } from '../list-of-doner-type/list-of-doner-type.component';
import { AddAreaOfConsultationComponent } from '../add-area-of-consultation/add-area-of-consultation.component';
import { ListOfAreaOfConsultationComponent } from '../list-of-area-of-consultation/list-of-area-of-consultation.component';
import { AddDiseaseComponent } from '../add-disease/add-disease.component';
import { ListOfDiseaseComponent } from '../list-of-disease/list-of-disease.component';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { ListOfPatientComponent } from '../list-of-patient/list-of-patient.component';
import { AddDegreeComponent } from '../add-degree/add-degree.component';
import { ListOfDegreeComponent } from '../list-of-degree/list-of-degree.component';
import { AddDesignationComponent } from '../add-designation/add-designation.component';
import { ListOfDesignationComponent } from '../list-of-designation/list-of-designation.component';
import { AddSpeacialDemandComponent } from '../add-speacial-demand/add-speacial-demand.component';
import { ListOfSpeacialDemandComponent } from '../list-of-speacial-demand/list-of-speacial-demand.component';
import { AddSpeacialInterestComponent } from '../add-speacial-interest/add-speacial-interest.component';
import { ListOfSpeacialInterestComponent } from '../list-of-speacial-interest/list-of-speacial-interest.component';

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

		// Area Component
		{ path: 'addaddress', component: AddAddresComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addresslist', component: ListOfAddressComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addaddress/:Id', component: AddAddresComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Blood Group Component
		{ path: 'addbloodgroup', component: AddBloodgroupComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'blgrouplist', component: ListOfBloodgroupComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addbloodgroup/:Id', component: AddBloodgroupComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Blood req  Component
		{ path: 'addreq', component: AddBloodReqComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'reqlist', component: ListOfBloodReqComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addreq/:Id', component: AddBloodReqComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Blood req  Component
		{ path: 'addreqinfo', component: AddBloodReqInfoComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'infolist', component: ListOfBloodReqInfoComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addreqinfo/:Id', component: AddBloodReqInfoComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Doner type  Component
		{ path: 'addtype', component: AddDonerTypeComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'donertypelist', component: ListOfDonerTypeComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addtype/:Id', component: AddDonerTypeComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Consultation Area Component
		{ path: 'addconsultationarea', component: AddAreaOfConsultationComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'consultationarealist', component: ListOfAreaOfConsultationComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addconsultationarea/:Id', component: AddAreaOfConsultationComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Disease Component
		{ path: 'adddisease', component: AddDiseaseComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'diseaselist', component: ListOfDiseaseComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'adddisease/:Id', component: AddDiseaseComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Patient Component
		{ path: 'addpatient', component: AddPatientComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'patientlist', component: ListOfPatientComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addpatient/:Id', component: AddPatientComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Degree Component
		{ path: 'adddegree', component: AddDegreeComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'degreelist', component: ListOfDegreeComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'adddegree/:Id', component: AddDegreeComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Designation Component
		{ path: 'adddesignation', component: AddDesignationComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'designationlist', component: ListOfDesignationComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'adddesignation/:Id', component: AddDesignationComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Designation Component
		{ path: 'adddemand', component: AddSpeacialDemandComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'demandlist', component: ListOfSpeacialDemandComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'adddemand/:Id', component: AddSpeacialDemandComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},

		// Designation Component
		{ path: 'addinterest', component: AddSpeacialInterestComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'interestlist', component: ListOfSpeacialInterestComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},
		{ path: 'addinterest/:Id', component: AddSpeacialInterestComponent,loadChildren: () => import("./crud.module").then(m => m.CrudModule)},




	])],
	exports: [RouterModule]
})
export class CrudRoutingModule { }
