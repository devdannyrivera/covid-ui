import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStatiscticInfoComponent } from './country-statisctic-info.component';

describe('CountryStatiscticInfoComponent', () => {
  let component: CountryStatiscticInfoComponent;
  let fixture: ComponentFixture<CountryStatiscticInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryStatiscticInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStatiscticInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
