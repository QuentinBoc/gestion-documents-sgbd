import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkshopComponent } from './add-workshop.component';

describe('AddWorkshopComponent', () => {
  let component: AddWorkshopComponent;
  let fixture: ComponentFixture<AddWorkshopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWorkshopComponent]
    });
    fixture = TestBed.createComponent(AddWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
