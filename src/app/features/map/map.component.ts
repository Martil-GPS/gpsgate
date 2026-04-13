import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import * as L from 'leaflet';
import { AuthService } from '../../core/services/auth.service';
import { GpsGateApiService } from '../../core/services/gpsgate-api.service';
import { VehicleUser } from '../../core/models/user.model';
import { GpsGateApplication } from '../../core/models/session.model';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  private map!: L.Map;
  private markers: Map<number, L.Marker> = new Map();
  private updateSub?: Subscription;

  vehicles: VehicleUser[] = [];
  filteredVehicles: VehicleUser[] = [];
  searchTerm = '';
  sidebarOpen = true;
  appName = '';
  loading = true;

  appDropdownOpen = false;
  appSearchText = '';
  applications: GpsGateApplication[] = [];
  filteredApps: GpsGateApplication[] = [];
  selectedAppId: number = 0;

  constructor(
    private authService: AuthService,
    private apiService: GpsGateApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.applications = this.authService.getApplications();
    this.filteredApps = [...this.applications];
    this.selectedAppId = this.authService.getSelectedAppId() || 0;
    const selectedApp = this.applications.find(a => a.id === this.selectedAppId);
    this.appName = selectedApp?.name || 'GPS Tracking';
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadInitialData();
    this.startAutoUpdate();
  }

  ngOnDestroy(): void {
    this.updateSub?.unsubscribe();
    if (this.map) this.map.remove();
  }

  toggleAppDropdown(): void {
    this.appDropdownOpen = !this.appDropdownOpen;
    if (this.appDropdownOpen) {
      this.appSearchText = '';
      this.filteredApps = [...this.applications];
    }
  }

  filterApps(): void {
    const s = this.appSearchText.toLowerCase();
    this.filteredApps = this.applications.filter(a => a.name.toLowerCase().includes(s));
  }

  switchApp(app: GpsGateApplication): void {
    this.appDropdownOpen = false;
    this.appSearchText = '';
    this.selectedAppId = app.id;
    this.appName = app.name;
    this.authService.selectApplication(app.id);
    this.updateSub?.unsubscribe();
    this.markers.forEach(m => m.remove());
    this.markers.clear();
    this.vehicles = [];
    this.filteredVehicles = [];
    this.loading = true;
    this.loadInitialData();
    this.startAutoUpdate();
  }

  private initMap(): void {
    this.map = L.map('map', { center: [41.33, 19.82], zoom: 13, zoomControl: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(this.map);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }

  private loadInitialData(): void {
    this.loading = true;
    this.apiService.getUsers().subscribe({
      next: (users) => {
        this.vehicles = users;
        this.filterVehicles();
        this.updateMarkers();
        this.loading = false;
        this.fitBounds();
      },
      error: () => { this.loading = false; }
    });
  }

  private startAutoUpdate(): void {
    this.updateSub = interval(3000).pipe(
      switchMap(() => this.apiService.getUpdates().pipe(catchError(() => EMPTY)))
    ).subscribe(updateData => {
      if (updateData && updateData.length) this.applyUpdates(updateData);
    });
  }

  private applyUpdates(updatedUsers: any[]): void {
    for (const update of updatedUsers) {
      const idx = this.vehicles.findIndex(v => v.id === update.id);
      if (idx >= 0) {
        if (update.trackPoint) this.vehicles[idx].trackPoint = update.trackPoint;
        if (update.calculatedSpeed !== undefined) this.vehicles[idx].calculatedSpeed = update.calculatedSpeed;
        if (update.deviceActivity) this.vehicles[idx].deviceActivity = update.deviceActivity;
      }
    }
    this.filterVehicles();
    this.updateMarkers();
  }

  private updateMarkers(): void {
    for (const vehicle of this.vehicles) {
      if (!vehicle.trackPoint?.pos) continue;
      const lat = vehicle.trackPoint.pos.lat;
      const lng = vehicle.trackPoint.pos.lng;
      const heading = vehicle.trackPoint.vel?.heading || 0;
      const color = this.getStatusColor(vehicle);
      const icon = this.createVehicleIcon(color, heading);
      const existingMarker = this.markers.get(vehicle.id);
      if (existingMarker) {
        existingMarker.setLatLng([lat, lng]);
        existingMarker.setIcon(icon);
      } else {
        const marker = L.marker([lat, lng], { icon }).addTo(this.map).bindPopup(this.createPopupContent(vehicle));
        marker.on('click', () => marker.setPopupContent(this.createPopupContent(vehicle)));
        this.markers.set(vehicle.id, marker);
      }
    }
  }

  private createVehicleIcon(color: string, heading: number): L.DivIcon {
    return L.divIcon({
      className: 'vehicle-marker',
      html: '<div class="marker-dot" style="background:' + color + '; transform:rotate(' + heading + 'deg)"><div class="marker-arrow"></div></div><div class="marker-pulse" style="border-color:' + color + '"></div>',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -14]
    });
  }

  private createPopupContent(vehicle: VehicleUser): string {
    const speed = vehicle.calculatedSpeed?.toFixed(1) || '0';
    const lastActive = vehicle.deviceActivity ? new Date(parseInt(vehicle.deviceActivity)).toLocaleString('sq-AL') : 'N/A';
    return '<div class="vehicle-popup"><strong>' + (vehicle.name || vehicle.username) + '</strong><br/><small>' + (vehicle.description || '') + '</small><hr style="border-color:#333;margin:6px 0"/><b>Shpejtesia:</b> ' + speed + ' km/h<br/><b>Aktiviteti:</b> ' + lastActive + '</div>';
  }

  getStatusColor(vehicle: VehicleUser): string {
    if (!vehicle.trackPoint || !vehicle.trackPoint.valid) return '#e74c3c';
    const now = new Date().getTime();
    const activity = parseInt(vehicle.deviceActivity);
    const diffMinutes = (now - activity) / 60000;
    if (diffMinutes <= 5) return '#2ecc71';
    if (diffMinutes <= 30) return '#f39c12';
    return '#e74c3c';
  }

  getStatusLabel(vehicle: VehicleUser): string {
    const color = this.getStatusColor(vehicle);
    if (color === '#2ecc71') return 'Aktiv';
    if (color === '#f39c12') return 'Jo aktiv';
    return 'Offline';
  }

  private fitBounds(): void {
    const positions = this.vehicles
      .filter(v => v.trackPoint?.pos)
      .map(v => [v.trackPoint!.pos.lat, v.trackPoint!.pos.lng] as L.LatLngTuple);
    if (positions.length > 0) this.map.fitBounds(L.latLngBounds(positions), { padding: [50, 50] });
  }

  filterVehicles(): void {
    if (!this.searchTerm) {
      this.filteredVehicles = [...this.vehicles];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredVehicles = this.vehicles.filter(v =>
        (v.name || '').toLowerCase().includes(term) ||
        (v.username || '').toLowerCase().includes(term) ||
        (v.description || '').toLowerCase().includes(term)
      );
    }
  }

  focusVehicle(vehicle: VehicleUser): void {
    if (!vehicle.trackPoint?.pos) return;
    const lat = vehicle.trackPoint.pos.lat;
    const lng = vehicle.trackPoint.pos.lng;
    this.map.setView([lat, lng], 16);
    const marker = this.markers.get(vehicle.id);
    if (marker) {
      marker.setPopupContent(this.createPopupContent(vehicle));
      marker.openPopup();
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}