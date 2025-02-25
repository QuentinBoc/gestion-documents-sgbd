import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkshopsComponent } from './list-workshops.component';

describe('ListWorkshopsComponent', () => {
  let component: ListWorkshopsComponent;
  let fixture: ComponentFixture<ListWorkshopsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWorkshopsComponent]
    });
    fixture = TestBed.createComponent(ListWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
