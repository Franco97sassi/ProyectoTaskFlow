import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  submitting = false;
  errorMessage = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.errorMessage = '';
    this.auth.login(this.form.getRawValue() as { email: string; password: string }).subscribe({
      next: ({ token }) => {
        this.auth.saveToken(token);
        this.router.navigateByUrl('/dashboard');
      },
      error: () => {
        this.submitting = false;
        this.errorMessage = 'No pudimos iniciar sesión. Verificá tus credenciales.';
      }
    });
  }
}
