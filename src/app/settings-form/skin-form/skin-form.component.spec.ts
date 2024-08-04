import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinFormComponent } from './skin-form.component';

describe('SkinFormComponent', () => {
  let component: SkinFormComponent;
  let fixture: ComponentFixture<SkinFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkinFormComponent]
    });
    fixture = TestBed.createComponent(SkinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
