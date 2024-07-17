import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBloodgroupComponent } from './add-bloodgroup.component';

describe('AddBloodgroupComponent', () => {
  let component: AddBloodgroupComponent;
  let fixture: ComponentFixture<AddBloodgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBloodgroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBloodgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
