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

  sync() {
    return this.service.get('sync').pipe(
      map(result => {
        return result;
      })
    );
  }
}
