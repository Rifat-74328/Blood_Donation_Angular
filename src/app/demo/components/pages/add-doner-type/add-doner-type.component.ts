import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IDonerType } from 'src/app/api/IDonerType.model';
import { DonerTypeService } from 'src/app/Services/donertype.service';

@Component({
  selector: 'app-add-doner-type',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './add-doner-type.component.html',
  styleUrl: './add-doner-type.component.scss'
})
export class AddDonerTypeComponent {

  builder = inject(FormBuilder);
  service = inject(DonerTypeService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Types:IDonerType[]=[];
  singletype:IDonerType | undefined;
  submitted = false;
  DonerTypeForm = this.builder.group({
    Id: [0],
    DonerTypes: ['', [Validators.required]]
  });

  DonerTypeId!: number;
  isEdit = false;

  ngOnInit() {
    debugger
    this.DonerTypeId = this.route.snapshot.params['Id'];
    if (this.DonerTypeId) {
      this.isEdit = true;
      this.service.getDonerType(this.DonerTypeId).subscribe((result) => {
        console.log(result);
        this.DonerTypeForm.patchValue(result);
        
      });
    }
        
  }

  
  RefreshList(){
    this.service.getAllDonerType().subscribe((result: IDonerType[]) => {
      this.Types = result;
      console.log(this.Types);
    });
  }

  Save() {
    console.log(this.DonerTypeForm.value);
    const type: IDonerType = {
      Id: this.DonerTypeForm.value.Id!,
      DonerTypes: this.DonerTypeForm.value.DonerTypes!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(type);
      this.service.updateDonerType( type).subscribe((r) => {
        console.log(r);
         this.router.navigateByUrl('/pages/crud/donertypelist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      this.service.createDonerType(type).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/donertypelist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
