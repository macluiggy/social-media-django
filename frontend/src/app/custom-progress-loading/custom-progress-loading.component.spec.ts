import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProgressLoadingComponent } from './custom-progress-loading.component';

describe('CustomProgressLoadingComponent', () => {
  let component: CustomProgressLoadingComponent;
  let fixture: ComponentFixture<CustomProgressLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomProgressLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomProgressLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
