import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryStaticFormComponent } from './country-static-form.component';

describe('CountryStaticFormComponent', () => {
  let component: CountryStaticFormComponent;
  let fixture: ComponentFixture<CountryStaticFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryStaticFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryStaticFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
