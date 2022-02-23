import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private service: AppService) {}

  login(user: { email: string; password: string }) {
    return this.service.post('auth/login', user).pipe(map(result => result));
  }

  register(user: { name: string; email: string; password: string }) {
    return this.service.post('auth/signup', user).pipe(map(result => result));
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    return this.service
      .post('auth/refresh-token', { refreshToken })
      .pipe(map(result => result));
  }

  setLocalStorage(payload: any, token: string, refreshToken: string) {
    localStorage.setItem('user', JSON.stringify(payload));
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  updateToken(token: string) {
    localStorage.setItem('token', token);
  }
}
