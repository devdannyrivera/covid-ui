import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  faUser = faUser;
  faLock = faLock;
  form: FormGroup = new FormGroup({});
  errorMessage: string = '';
  constructor(private formBuilder: FormBuilder, private service: AuthService) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  validateForm() {
    if (this.emailField?.invalid || this.passwordField?.invalid) {
      this.errorMessage = 'Fields are invalid';
      return false;
    }
    this.errorMessage = '';
    return true;
  }

  onSubmit() {
    const isValid = this.validateForm();

    if (!isValid) {
      return false;
    }

    const email = this.emailField?.value;
    const password = this.passwordField?.value;

    this.service.login({ email, password }).subscribe({
      next: result => {
        const { user, token } = result;
        this.service.setLocalStorage(user, token);
      },
      error: error => {
        const { msg } = error.error;
        this.errorMessage = msg;
      },
    });

    return true;
  }
}
