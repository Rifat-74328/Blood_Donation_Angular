import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ibloodgroup } from 'src/app/api/Ibloodgroup.model';
import { BloodGroupService } from 'src/app/Services/bloodgroup.service';

@Component({
  selector: 'app-add-bloodgroup',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-bloodgroup.component.html',
  styleUrl: './add-bloodgroup.component.scss'
})
export class AddBloodgroupComponent {

  builder = inject(FormBuilder);
  service = inject(BloodGroupService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  groups:Ibloodgroup[]=[];
  singlegroup:Ibloodgroup | undefined;

  submitted = false;
  groupForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]],
    Description:['',[Validators.required]]
  });

  groupId!: number;
  isEdit = false;

  ngOnInit() {
    this.groupId = this.route.snapshot.params['Id'];
    if (this.groupId) {
      this.isEdit = true;
      this.service.getBloodGroup(this.groupId).subscribe((result) => {
        console.log(result);
        this.groupForm.patchValue(result);
        
      });
    }
    
  }
  RefreshList(){
    this.service.getAllBloodGroup().subscribe((result: Ibloodgroup[]) => {
      this.groups = result;
      console.log(this.groups);
    });
  }

  Save() {
    console.log(this.groupForm.value);
    const group: Ibloodgroup = {
      Id: this.groupForm.value.Id!,
      Name: this.groupForm.value.Name!,
      Description: this.groupForm.value.Description!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(group);
      this.service.updateBloodGroup( group).subscribe((r) => {
        console.log(r);
        this.router.navigateByUrl('/pages/crud/blgrouplist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      debugger
      this.service.createBloodGroup(group).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/blgrouplist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
