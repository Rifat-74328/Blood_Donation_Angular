import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DivisionService } from 'src/app/Services/division.service';
import { IDivision } from 'src/app/api/IDivision.model';
import { DropdownModule } from 'primeng/dropdown';
import { ICountry } from 'src/app/api/ICountry.model';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThanaService } from 'src/app/Services/thana.service';
import { DistrictService } from 'src/app/Services/district.service';
import { IDistrict } from 'src/app/api/IDistrict.model';
import { IThana } from 'src/app/api/IThana.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-thana',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatDividerModule,RouterLink,DropdownModule, MatSelectModule,MatInputModule,RippleModule,
    MatFormFieldModule,ToastModule,ButtonModule],
  templateUrl: './add-thana.component.html',
  styleUrl: './add-thana.component.css',
  providers: [MessageService]
})
export class AddThanaComponent {

  builder = inject(FormBuilder);
  service = inject(ThanaService);
  dist_srv = inject(DistrictService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  messageService=inject (MessageService)
  // toaster = inject(ToastrService);
 
  Districts:IDistrict[]=[];
  singledistrict:IDistrict | undefined;
  Thanas:IThana[]=[]
  Selectedthana!:IThana
  submitted = false;
  thanaForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]],
    DistrictId: [0, [Validators.required]]
  });

  thanaId!: number;
  isEdit = false;

  ngOnInit() {
    debugger
    this.thanaId = this.route.snapshot.params['Id'];
    if (this.thanaId) {
      this.isEdit = true;
      this.service.getThana(this.thanaId).subscribe((result) => {
        console.log(result);
        this.thanaForm.patchValue(result);
        
      });
    }
    this.getDistrict();
    
  }

  getDistrict(){ this.dist_srv.getAllDistrict().subscribe((r:IDistrict[])=>{
    this.Districts=r
    console.log("districts" ,r)
    })
  }
  RefreshList(){
    this.service.getAllThana().subscribe((result: IThana[]) => {
      this.Thanas = result;
      console.log(this.Thanas);
    });
  }

  Save() {
    console.log(this.thanaForm.value);
    const thana: IThana = {
      Id: this.thanaForm.value.Id!,
      Name: this.thanaForm.value.Name!,
      DistrictId:this.thanaForm.value.DistrictId!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(thana);
      this.service.updateThana( thana).subscribe((r) => {
        console.log(r);
         this.router.navigateByUrl('/pages/crud/thanalist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      if(this.service.createThana(thana).subscribe(
        (result) => console.log(result))){
          this.RefreshList();
        console.log('success');
        this.router.navigateByUrl('/pages/crud/thanalist');
        
      }
        
        
       
      
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
}
}
