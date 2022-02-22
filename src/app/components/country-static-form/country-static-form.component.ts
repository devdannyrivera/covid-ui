import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-country-static-form',
  templateUrl: './country-static-form.component.html',
  styleUrls: ['./country-static-form.component.scss'],
})
export class CountryStaticFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private service: StatisticService,
    private toastr: ToastrService
  ) {
    this.buildForm();
  }
  @Input() currentStat: any;

  private buildForm() {
    this.form = this.formBuilder.group({
      newTests: [],
      newActiveCases: [],
      newCriticalCases: [],
      newRecoveredCases: [],
      newDeaths: [],
    });
  }

  private get newTestsField() {
    return this.form.get('newTests');
  }
  private get newActiveCasesField() {
    return this.form.get('newActiveCases');
  }
  private get newCriticalCasesField() {
    return this.form.get('newCriticalCases');
  }
  private get newRecoveredCasesField() {
    return this.form.get('newRecoveredCases');
  }
  private get newDeathsField() {
    return this.form.get('newDeaths');
  }

  ngOnInit(): void {
    console.log(this.currentStat);
  }

  onSubmit() {
    this.addValuesToCurrentData();
    this.cleanForm();

    this.saveData();
  }

  addValuesToCurrentData() {
    this.currentStat.deaths.total += this.newDeathsField?.value || 0;
    this.currentStat.tests.total += this.newTestsField?.value || 0;
    this.currentStat.cases.active += this.newActiveCasesField?.value || 0;
    this.currentStat.cases.critical += this.newCriticalCasesField?.value || 0;
    this.currentStat.cases.recovered += this.newRecoveredCasesField?.value || 0;
  }

  cleanForm() {
    this.form.reset();
  }

  saveData() {
    const { cases, tests, deaths } = this.currentStat;
    this.service
      .updateCountryStats(this.currentStat._id, {
        cases,
        tests,
        deaths,
      })
      .subscribe({
        next: () => {
          this.toastr.success('Succesfully Saved');
        },
        error: error => {
          const { msg } = error.error;
          this.toastr.error(msg);
        },
      });
  }
}
