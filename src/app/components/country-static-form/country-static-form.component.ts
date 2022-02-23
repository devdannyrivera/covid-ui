import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { StatisticService } from 'src/app/services/statistic.service';

@Component({
  selector: 'app-country-static-form',
  templateUrl: './country-static-form.component.html',
  styleUrls: ['./country-static-form.component.scss'],
})
export class CountryStaticFormComponent {
  form: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private service: StatisticService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
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

  onSubmit() {
    this.addValuesToCurrentData();
    this.cleanForm();
  }

  addValuesToCurrentData() {
    const newDeaths = this.newDeathsField?.value || 0;
    const newTests = this.newTestsField?.value || 0;
    const newActiveCases = this.newActiveCasesField?.value || 0;
    const newCriticalCases = this.newCriticalCasesField?.value || 0;
    const newRecoveredCases = this.newRecoveredCasesField?.value || 0;
    const newCases = newActiveCases + newCriticalCases + newRecoveredCases;
    if (
      !(
        newDeaths +
          newTests +
          newActiveCases +
          newCriticalCases +
          newRecoveredCases >
        0
      )
    ) {
      return false;
    }

    this.currentStat.deaths.total += newDeaths;
    this.currentStat.tests.total += newTests;
    this.currentStat.cases.total += newCases;
    this.currentStat.cases.active += newActiveCases;
    this.currentStat.cases.critical += newCriticalCases;
    this.currentStat.cases.recovered += newRecoveredCases;

    newDeaths > 0 ? (this.currentStat.deaths.new = `+${newDeaths}`) : '';
    newCases > 0 ? (this.currentStat.cases.new = `+${newCases}`) : '';
    this.saveData();
    return true;
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
          const { status } = error;

          if (status == 401 && msg != 'x-api-token header not found') {
            this.authService.refreshToken().subscribe({
              next: response => {
                const { token } = response;
                this.authService.updateToken(token);
                this.saveData();
              },
              error: () => {
                this.toastr.error('You have to signin');
              },
            });
          } else {
            this.router.navigateByUrl('/statistic');
            this.toastr.error(msg);
          }
        },
      });
  }
}
