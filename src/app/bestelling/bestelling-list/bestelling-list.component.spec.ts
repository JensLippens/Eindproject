import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellingListComponent } from './bestelling-list.component';

describe('BestellingListComponent', () => {
  let component: BestellingListComponent;
  let fixture: ComponentFixture<BestellingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestellingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
