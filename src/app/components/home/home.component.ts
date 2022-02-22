import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticService } from 'src/app/services/statistic.service';
import { faInfo, faSync } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faInfo = faInfo;
  faSync = faSync;
  statistics: any;

  constructor(
    private router: Router,
    private service: StatisticService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.sendToLogin();
    }

    this.loadData();
  }

  sendToLogin() {
    this.router.navigateByUrl('/login');
  }

  loadData(search = '', page = 1, size = 100) {
    this.service.get(search, page, size).subscribe({
      next: result => {
        let { statistics } = result.body;
        this.statistics = statistics;
      },
      error: error => {
        this.toastr.error(error);
      },
    });
  }

  handleChange(event: any) {
    this.loadData(event.target.value);
  }

  syncStats() {
    this.service.sync().subscribe({
      next: result => {
        const { msg } = result.body;
        this.loadData();
        this.toastr.success(msg);
      },
      error: error => {
        console.log(error);
      },
    });
  }

  getMoreInfo(countryId: string) {
    this.router.navigateByUrl(`country/${countryId}`);
  }
}