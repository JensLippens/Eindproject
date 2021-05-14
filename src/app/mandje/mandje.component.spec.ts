import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandjeComponent } from './mandje.component';

describe('MandjeComponent', () => {
  let component: MandjeComponent;
  let fixture: ComponentFixture<MandjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
