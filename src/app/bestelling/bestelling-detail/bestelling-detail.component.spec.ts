import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellingDetailComponent } from './bestelling-detail.component';

describe('BestellingDetailComponent', () => {
  let component: BestellingDetailComponent;
  let fixture: ComponentFixture<BestellingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestellingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BestellingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
