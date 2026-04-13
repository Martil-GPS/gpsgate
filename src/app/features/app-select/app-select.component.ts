import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { GpsGateApplication } from '../../core/models/session.model';

@Component({
  selector: 'app-app-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss']
})
export class AppSelectComponent implements OnInit {
  applications: GpsGateApplication[] = [];
  userName = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applications = this.authService.getApplications();
    this.userName = this.authService.getSession()?.UserDisplayName || '';

    if (this.applications.length === 0) {
      this.router.navigate(['/login']);
    }
  }

  selectApp(app: GpsGateApplication): void {
    this.authService.selectApplication(app.id);
    this.router.navigate(['/map']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
