import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatisticService } from 'src/app/services/statistic.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-country-statisctic-info',
  templateUrl: './country-statisctic-info.component.html',
  styleUrls: ['./country-statisctic-info.component.scss'],
})
export class CountryStatiscticInfoComponent implements OnInit {
  countryId: string = '';
  data: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private service: StatisticService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.countryId = paramMap.get('id') || '';
    });

    this.loadData();
  }

  loadData() {
    this.service.getByCountry(this.countryId).subscribe({
      next: result => {
        this.data = result.body.result;
      },
      error: error => {
        const { msg } = error.error;
        const { status } = error;

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
          this.router.navigateByUrl('/');
          this.toastr.error(msg);
        }
      },
    });
  }
}
