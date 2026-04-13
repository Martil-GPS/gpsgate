import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Ju lutem plotësoni username dhe password.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        const apps = this.authService.getApplications();

        if (apps.length === 1) {
          this.authService.selectApplication(apps[0].id);
          this.router.navigate(['/map']);
        } else if (apps.length > 1) {
          this.router.navigate(['/app-select']);
        } else {
          this.errorMessage = 'Nuk ka aplikacione të disponueshme.';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Login dështoi. Kontrolloni kredencialet.';
      }
    });
  }
}
