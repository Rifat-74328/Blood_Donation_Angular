import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AreaService } from 'src/app/Services/area.service';
import { ThanaService } from 'src/app/Services/thana.service';
import { IArea } from 'src/app/api/IArea.model';
import { IThana } from 'src/app/api/IThana.model';
@Component({
  selector: 'app-division',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatButtonModule,MatIconModule,MatDividerModule,RouterLink,DropdownModule, MatSelectModule,MatInputModule,
    MatFormFieldModule,],
  templateUrl: './add-area.component.html',
  styleUrl: './add-area.component.css'
})
export class AddAreaComponent {

  builder = inject(FormBuilder);
  service = inject(AreaService);
  thana_srv = inject(ThanaService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  // toaster = inject(ToastrService);
 
  Areas:IArea[]=[];
  singlearea:IArea | undefined;
  Thanas:IThana[]=[]
  Selectedthana!:IThana
  submitted = false;
  areaForm = this.builder.group({
    Id: [0],
    Name: ['', [Validators.required]],
    ThanaId: [0, [Validators.required]]
  });

  areaId!: number;
  isEdit = false;

  ngOnInit() {
    debugger
    this.areaId = this.route.snapshot.params['Id'];
    if (this.areaId) {
      this.isEdit = true;
      this.service.getArea(this.areaId).subscribe((result) => {
        console.log(result);
        this.areaForm.patchValue(result);
        
      });
    }
    this.getThana();
    
  }

  getThana(){ this.thana_srv.getAllThana().subscribe((r:IThana[])=>{
    this.Thanas=r
    console.log("thanas" ,r)
    })
  }
  RefreshList(){
    this.service.getAllArea().subscribe((result: IArea[]) => {
      this.Areas = result;
      console.log(this.Areas);
    });
  }

  Save() {
    console.log(this.areaForm.value);
    const area: IArea = {
      Id: this.areaForm.value.Id!,
      Name: this.areaForm.value.Name!,
      ThanaId:this.areaForm.value.ThanaId!
    };
    //Edit

    if (this.isEdit) {
      debugger
      console.log(area);
      this.service.updateArea(area).subscribe((r) => {
        console.log(r);
         this.router.navigateByUrl('/pages/crud/arealist');
        // this.toaster.info('Record Updated Successfully');
      });
    } else {
      this.service.createArea(area).subscribe(
        (result) => console.log(result)
        
      );
      this.RefreshList();
      console.log('success');
      this.router.navigateByUrl('/pages/crud/arealist');
      // this.toaster.success('Record created Successfully');
    //}
  }
  
  }


}
