import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminproductdetailsComponent } from './adminproductdetails.component';

describe('AdminproductdetailsComponent', () => {
  let component: AdminproductdetailsComponent;
  let fixture: ComponentFixture<AdminproductdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminproductdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminproductdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
