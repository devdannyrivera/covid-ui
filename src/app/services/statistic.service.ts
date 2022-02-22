import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private service: AppService) {}

  get(search: string, page: number, size: number) {
    return this.service
      .get(`statistic?size=${size}&page=${page}&country=${search}`)
      .pipe(
        map(result => {
          return result;
        })
      );
  }

  getByCountry(id: string) {
    return this.service.get(`statistic/${id}`).pipe(
      map(result => {
        return result;
      })
    );
  }

  updateCountryStats(
    id: string,
    cases: { deaths: any; tests: any; cases: any }
  ) {
    return this.service.post(`statistic/${id}`, cases).pipe(
      map(result => {
        return result;
      })
    );
  }

  sync() {
    return this.service.get('sync').pipe(
      map(result => {
        return result;
      })
    );
  }
}
