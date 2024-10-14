import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminusermanagementComponent } from './adminusermanagement.component';

describe('AdminusermanagementComponent', () => {
  let component: AdminusermanagementComponent;
  let fixture: ComponentFixture<AdminusermanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminusermanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminusermanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
