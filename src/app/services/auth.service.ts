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
    return this.service.post('auth/register', user).pipe(map(result => result));
  }

  setLocalStorage(payload: any, token: string) {
    localStorage.setItem('user', JSON.stringify(payload));
    localStorage.setItem('token', token);
  }
}
