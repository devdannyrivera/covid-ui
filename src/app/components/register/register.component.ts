import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  faUser = faUser;
  faLock = faLock;
  form: FormGroup = new FormGroup({});
  errorMessage: string = '';
  successMessage: string = '';
  constructor(private formBuilder: FormBuilder, private service: AuthService) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordrepeat: ['', Validators.required],
    });
  }

  get nameField() {
    return this.form.get('name');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }

  get passwordrepeatField() {
    return this.form.get('passwordrepeat');
  }

  validateForm() {
    if (this.emailField?.invalid) {
      this.errorMessage = 'Email is invalid';
      return false;
    }

    if (
      this.nameField?.invalid ||
      this.passwordField?.invalid ||
      this.passwordrepeatField?.invalid
    ) {
      this.errorMessage = 'Name / Password are invalid';
      return false;
    }

    if (this.passwordField?.value !== this.passwordrepeatField?.value) {
      this.errorMessage = 'Passwords does not match';
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

    const name = this.nameField?.value;
    const email = this.emailField?.value;
    const password = this.passwordField?.value;

    this.service.register({ name, email, password }).subscribe({
      next: () => {
        this.successMessage =
          'You were registered successfuly, now you can login';
      },
      error: error => {
        const { msg } = error.error;
        this.errorMessage = msg;
      },
    });

    return true;
  }
}
