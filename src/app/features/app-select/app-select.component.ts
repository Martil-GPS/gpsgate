import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { GpsGateApplication } from '../../core/models/session.model';

@Component({
  selector: 'app-app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app-select.component.html',
  styleUrls: ['./app-select.component.scss']
})
export class AppSelectComponent implements OnInit {
  applications: GpsGateApplication[] = [];
  filteredApps: GpsGateApplication[] = [];
  selectedApp: GpsGateApplication | null = null;
  userName = '';
  isOpen = false;
  searchText = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applications = this.authService.getApplications();
    this.filteredApps = [...this.applications];
    this.userName = this.authService.getSession()?.UserDisplayName || '';
    if (this.applications.length === 0) {
      this.router.navigate(['/login']);
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchText = '';
      this.filteredApps = [...this.applications];
    }
  }

  filterApps(): void {
    const s = this.searchText.toLowerCase();
    this.filteredApps = this.applications.filter(a => a.name.toLowerCase().includes(s));
  }

  selectApp(app: GpsGateApplication): void {
    this.selectedApp = app;
    this.isOpen = false;
    this.searchText = '';
  }

  confirm(): void {
    if (this.selectedApp) {
      this.authService.selectApplication(this.selectedApp.id);
      this.router.navigate(['/map']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
