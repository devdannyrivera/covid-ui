import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticService } from 'src/app/services/statistic.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  faSync = faSync;
  statistics: any;
  currentPage: number = 1;
  itemsPerPage: number = 25;
  totalPages: number = 1;
  search: string = '';

  constructor(
    private router: Router,
    private service: StatisticService,
    private authService: AuthService,
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

  loadData() {
    this.service
      .get(this.search, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: result => {
          let { statistics, total } = result.body;
          this.totalPages = Math.ceil(total / this.itemsPerPage);
          this.statistics = statistics;
        },
        error: error => {
          const { status } = error;
          const { msg } = error.error;

          if (status == 401 && msg != 'x-api-token header not found') {
            this.authService.refreshToken().subscribe({
              next: response => {
                const { token } = response;
                this.authService.updateToken(token);
                this.loadData();
              },
              error: () => {
                this.toastr.error('You have to signin');
              },
            });
          } else {
            this.sendToLogin();
          }
        },
      });
  }

  handleChange(event: any) {
    this.search = event.target.value;
    this.loadData();
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
    this.router.navigateByUrl(`statistic/${countryId}`);
  }

  pageChanged(e: any) {
    this.currentPage = e.page;
    this.loadData();
  }
}
