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
import { GpsGateView } from '../../core/models/session.model';

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
  views: GpsGateView[] = [];
  selectedViewId: number = 0;
  searchTerm = '';
  sidebarOpen = true;
  appName = '';
  appDropdownOpen = false;
  appFilterTerm = '';
  currentAppId: number | null = null;
  allApps: any[] = [];
  loading = true;

  activeFilter: 'all' | 'moving' | 'idle' | 'parked' | 'offline' | 'pending' = 'all';
  selectedVehicle: VehicleUser | null = null;
  activeTab: 'status' | 'events' | 'trips' = 'status';
  detailPanelOpen = false;

  constructor(
    private authService: AuthService,
    private apiService: GpsGateApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const apps = this.authService.getApplications();
    const selectedId = this.authService.getSelectedAppId();
    const selectedApp = apps.find(a => a.id === selectedId);
    this.appName = selectedApp?.name || 'GPS Tracking';
    this.currentAppId = selectedId;
    this.allApps = apps;
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.loadInitialData();
    this.startAutoUpdate();
  }

  ngOnDestroy(): void {
    this.updateSub?.unsubscribe();
    if (this.map) { this.map.remove(); }
  }

  private initMap(): void {
    this.map = L.map('map', { center: [41.33, 19.82], zoom: 13, zoomControl: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: 'OpenStreetMap contributors', maxZoom: 19 }).addTo(this.map);
    L.control.zoom({ position: 'bottomright' }).addTo(this.map);
  }

  private loadInitialData(): void {
    this.loading = true;
    this.apiService.getViews().subscribe({
      next: (views) => {
        this.views = views;
        if (views.length > 0) { this.selectedViewId = views[0].id; }
        this.apiService.getUsers(this.selectedViewId).subscribe({
          next: (users) => {
            this.vehicles = users;
            this.filterVehicles();
            this.updateMarkers();
            this.loading = false;
            this.fitBounds();
          },
          error: () => { this.loading = false; }
        });
      },
      error: () => { this.loading = false; }
    });
  }

  onViewChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedViewId = value ? +value : this.views[0]?.id || 0;
    this.loadInitialData();
  }

  private startAutoUpdate(): void {
    this.updateSub = interval(5000).pipe(
      switchMap(() => this.apiService.getUpdates(this.selectedViewId).pipe(
        catchError(() => EMPTY)
      ))
    ).subscribe(users => {
      if (users && users.length > 0) {
        this.vehicles = users;
        this.filterVehicles();
        this.updateMarkers();
      }
    });
  }

  private updateMarkers(): void {
    for (const vehicle of this.vehicles) {
      if (!vehicle.trackPoint?.pos) continue;
      const lat = vehicle.trackPoint.pos.lat;
      const lng = vehicle.trackPoint.pos.lng;
      const heading = vehicle.trackPoint.vel?.heading || 0;
      const offline = !vehicle.trackPoint?.valid;
      const color = this.getStatusColor(vehicle);
      const name = vehicle.name || vehicle.username;
      const icon = this.createVehicleIcon(color, heading, offline, name);
      const existingMarker = this.markers.get(vehicle.id);
      if (existingMarker) {
        existingMarker.setLatLng([lat, lng]);
        existingMarker.setIcon(icon);
        existingMarker.setPopupContent(this.createPopupContent(vehicle));
      } else {
        const marker = L.marker([lat, lng], { icon }).addTo(this.map).bindPopup(this.createPopupContent(vehicle));
        this.markers.set(vehicle.id, marker);
      }
    }
  }

  private createVehicleIcon(color: string, heading: number, offline: boolean = false, name: string = ''): L.DivIcon {
    const label = '<div style="position:absolute;top:-28px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.6);color:#fff;font-size:12px;font-weight:bold;padding:3px 8px;border-radius:5px;white-space:nowrap;z-index:9999;pointer-events:none;">' + name + '</div>';
    let dot: string;
    if (offline) {
      dot = '<div style="width:14px;height:14px;border-radius:50%;background:#95a5a6;border:2px solid #7f8c8d;"></div>';
    } else if (color === '#e74c3c') {
      dot = '<div style="width:22px;height:22px;border-radius:50%;background:#e74c3c;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 4px rgba(0,0,0,0.4);"><span style="color:#fff;font-size:13px;font-weight:900;line-height:1;">P</span></div>';
    } else if (color === '#3498db') {
      dot = '<div style="width:22px;height:22px;border-radius:50%;background:#3498db;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 4px rgba(0,0,0,0.4);"><span style="color:#fff;font-size:13px;font-weight:900;line-height:1;">⏸</span></div>';
    } else {
      dot = '<div class="marker-dot" style="background:' + color + ';transform:rotate(' + heading + 'deg)"><div class="marker-arrow"></div></div>';
    }
    const html = '<div style="position:relative;width:22px;height:22px;overflow:visible;">' + label + dot + '</div>';
    return L.divIcon({ className: '', html: html, iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -36] });
  }

      private createPopupContent(vehicle: VehicleUser): string {
    const r = vehicle.recordData || {};
    const a = vehicle.attributes || {};
    const speed = ((vehicle.calculatedSpeed || 0) * 3.6).toFixed(1);
    const lastActive = vehicle.deviceActivity ? new Date(vehicle.deviceActivity).toLocaleString('en-US') : 'N/A';
    const skipKeys = new Set(['33', '978']);
    const labelMap: Record<string, { label: string; icon: string; format: (v: any) => string }> = {
      '9':    { label: 'Voltage',      icon: '⚡', format: (v: any) => (+v).toFixed(2) + ' V' },
      '25':   { label: 'Motion',       icon: '🏃', format: (v: any) => v === true ? '🟢 Yes' : '🔴 No' },
      '38':   { label: 'GSM',          icon: '📡', format: (v: any) => '▊'.repeat(Math.min(+v,5)) + ' (' + v + '/5)' },
      '43':   { label: 'Digital In 2', icon: '📥', format: (v: any) => v === true ? '🟢 ON' : '🔴 OFF' },
      '51':   { label: 'Satellites',   icon: '🛰️', format: (v: any) => String(v) },
      '170':  { label: 'Odometer',     icon: '📏', format: (v: any) => ((+v) / 1000).toFixed(1) + ' km' },
      '1083': { label: 'Battery',      icon: '🔋', format: (v: any) => (+v).toFixed(2) + ' V' },
      '1087': { label: 'Ignition',     icon: '🔑', format: (v: any) => v === true ? '🟢 ON' : '🔴 OFF' },
      '1091': { label: 'Analog 1',     icon: '🔌', format: (v: any) => (+v).toFixed(2) + ' V' },
      '1109': { label: 'Digital In 1', icon: '📥', format: (v: any) => v === true ? '🟢 ON' : '🔴 OFF' },
      '1122': { label: 'Analog 2',     icon: '🔌', format: (v: any) => (+v).toFixed(2) + ' V' },
      '5302': { label: 'GSM Operator', icon: '📶', format: (v: any) => String(v) },
      '2835': { label: 'Battery %',          icon: '🔋', format: (v: any) => String(v) + ' %' },
      '6267': { label: '🚪 Door Front Left',  icon: '🚗', format: (v: any) => v === true ? '🔓 Open' : '' },
      '6268': { label: '🚪 Door Front Right', icon: '🚗', format: (v: any) => v === true ? '🔓 Open' : '' },
      '6272': { label: '🚪 Door Rear Left',   icon: '🚗', format: (v: any) => v === true ? '🔓 Open' : '' },
      '6273': { label: '🚪 Door Rear Right',  icon: '🚗', format: (v: any) => v === true ? '🔓 Open' : '' },
      '6274': { label: '📌 [6274]', icon: '❓', format: (v: any) => v === true ? '🟢 ON' : '' },
      '6275': { label: '📌 [6275]', icon: '❓', format: (v: any) => v === true ? '🟢 ON' : '' },
    };
    let rows = '<tr><td>🚗 Speed</td><td><b>' + speed + ' km/h</b></td></tr>';
    for (const key of Object.keys(r)) {
      if (skipKeys.has(key)) continue;
      const entry = r[key];
      if (entry?.value === undefined || entry?.value === null) continue;
      const meta = labelMap[key];
      if (meta) {
        const formatted = meta.format(entry.value); if (formatted === '') continue;
        rows += '<tr><td>' + meta.icon + ' ' + meta.label + '</td><td><b>' + formatted + '</b></td></tr>';
      } else {
        const val = typeof entry.value === 'boolean' ? (entry.value ? '🟢 ON' : '🔴 OFF') : String(entry.value);
        rows += '<tr><td>📌 [' + key + ']</td><td><b>' + val + '</b></td></tr>';
      }
    }
    // Attributes dinamike (taximeter_status, klient_status etj)
    const attrLabelMap: Record<string, string> = {
      taximeter_status: "🚕 TaxiMeter",
      klient_status: "👤 Klient",
    };
    const skipAttrs = new Set(["MarkerColor", "VehicleStatusTemplateGuid", "MarkerIconSet", "Evbattery"]);
    for (const attrKey of Object.keys(a)) {
      if (skipAttrs.has(attrKey)) continue;
      const attrVal = a[attrKey]?.value;
      if (!attrVal) continue;
      let displayVal = attrVal;
      try {
        const parsed = JSON.parse(attrVal);
        const isOn = parsed?.color === "#00ff00" || parsed?.color === "#00FF00";
        displayVal = isOn ? "🟢 ON" : "🔴 OFF";
      } catch(e) { displayVal = attrVal; }
      const label = attrLabelMap[attrKey] || ("🏷️ " + attrKey.replace(/_/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()));
      rows += "<tr><td>" + label + "</td><td><b>" + displayVal + "</b></td></tr>";
    }
    rows += '<tr><td>🕐 Last Active</td><td><b>' + lastActive + '</b></td></tr>';
    return '<div class="vehicle-popup" style="min-width:220px;font-size:13px;">' +
      '<strong style="font-size:15px;">' + (vehicle.name || vehicle.username) + '</strong>' +
      '<hr style="margin:5px 0"/>' +
      '<table style="width:100%;border-collapse:collapse;">' + rows + '</table></div>';
  }

  getStatusColor(vehicle: VehicleUser): string {
    if (!vehicle.trackPoint?.valid) return '#95a5a6';
    const now = new Date().getTime();
    const diffMinutes = (now - vehicle.deviceActivity) / 60000;
    if (diffMinutes > 30) return '#95a5a6';
    const speed = (vehicle.calculatedSpeed || 0) * 3.6;
    if (speed > 5) return '#2ecc71';
    const motion = vehicle.recordData?.['25']?.value === true;
    if (motion) return '#3498db';
    return '#e74c3c';
  }

  getStatusLabel(vehicle: VehicleUser): string {
    if (!vehicle.trackPoint?.valid) return 'Offline';
    const now = new Date().getTime();
    const diffMinutes = (now - vehicle.deviceActivity) / 60000;
    if (diffMinutes > 30) return 'Offline';
    const speed = (vehicle.calculatedSpeed || 0) * 3.6;
    if (speed > 5) return 'Moving';
    const motion = vehicle.recordData?.['25']?.value === true;
    if (motion) return 'Idle';
    return 'Parked';
  }

  private fitBounds(): void {
    const positions = this.vehicles
      .filter((v: VehicleUser) => v.trackPoint?.pos)
      .map((v: VehicleUser) => [v.trackPoint!.pos.lat, v.trackPoint!.pos.lng] as L.LatLngTuple);
    if (positions.length > 0) { this.map.fitBounds(L.latLngBounds(positions), { padding: [50, 50] }); }
  }

  // ─── Dashboard stat getters ───────────────────────────────────────────────
  get statsTotal(): number { return this.vehicles.length; }
  get statsMoving(): number { return this.vehicles.filter(v => this.getStatusLabel(v) === 'Moving').length; }
  get statsIdle(): number { return this.vehicles.filter(v => this.getStatusLabel(v) === 'Idle').length; }
  get statsParked(): number { return this.vehicles.filter(v => this.getStatusLabel(v) === 'Parked').length; }
  get statsOffline(): number { return this.vehicles.filter(v => this.getStatusLabel(v) === 'Offline').length; }
  get statsPending(): number { return 0; }

  setFilter(filter: string): void {
    this.activeFilter = filter as any;
    this.filterVehicles();
  }

  selectVehicle(vehicle: VehicleUser): void {
    this.selectedVehicle = vehicle;
    this.detailPanelOpen = true;
    this.activeTab = 'status';
    this.focusVehicle(vehicle);
  }

  closeDetailPanel(): void {
    this.selectedVehicle = null;
    this.detailPanelOpen = false;
  }

  setActiveTab(tab: 'status' | 'events' | 'trips'): void {
    this.activeTab = tab;
  }

  getStatusSymbol(vehicle: VehicleUser): string {
    const label = this.getStatusLabel(vehicle);
    if (label === 'Moving') return '▶';
    if (label === 'Idle') return '⏸';
    if (label === 'Parked') return 'P';
    return '•';
  }

  getTimeAgo(vehicle: VehicleUser): string {
    const diff = (Date.now() - vehicle.deviceActivity) / 1000;
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
    return Math.floor(diff / 3600) + ' h ago';
  }

  getAddress(vehicle: VehicleUser): string {
    if (vehicle.description) return vehicle.description;
    if (vehicle.trackPoint?.pos) {
      return vehicle.trackPoint.pos.lat.toFixed(4) + ', ' + vehicle.trackPoint.pos.lng.toFixed(4);
    }
    return '';
  }

  getVehicleFields(vehicle: VehicleUser): Array<{icon: string; label: string; value: string}> {
    const r = vehicle.recordData || {};
    const a = vehicle.attributes || {};
    const speed = ((vehicle.calculatedSpeed || 0) * 3.6).toFixed(1);
    const lastActive = vehicle.deviceActivity ? new Date(vehicle.deviceActivity).toLocaleString('en-US') : 'N/A';
    const skipKeys = new Set(['33', '978']);
    const labelMap: Record<string, { label: string; icon: string; format: (v: any) => string }> = {
      '9':    { label: 'Voltage',          icon: '⚡', format: (v: any) => (+v).toFixed(2) + ' V' },
      '25':   { label: 'Motion',           icon: '🏃', format: (v: any) => v === true ? '🟢 Yes' : '🔴 No' },
      '38':   { label: 'GSM',              icon: '📡', format: (v: any) => '▊'.repeat(Math.min(+v, 5)) + ' (' + v + '/5)' },
      '43':   { label: 'Digital In 2',     icon: '📥', format: (v: any) => v === true ? '🟢 ON' : '🔴 OFF' },
      '51':   { label: 'Satellites',       icon: '🛰️', format: (v: any) => String(v) },
      '170':  { label: 'Odometer',         icon: '📏', format: (v: any) => ((+v) / 1000).toFixed(1) + ' km' },
      '1083': { label: 'Battery',          icon: '🔋', format: (v: any) => (+v).toFixed(2) + ' V' },
      '1087': { label: 'Ignition',         icon: '🔑', format: (v: any) => v === true ? '🟢 ON' : '🔴 OFF' },
      '1091': { label: 'Analog 1',         icon: '🔌', format: (v: any) => (+v).toFixed(2) + ' V' },
      '1109': { label: 'Digital In 1',     icon: '📥', format: (v: any) => v === true ? '🟢 ON' : '🔴 OFF' },
      '1122': { label: 'Analog 2',         icon: '🔌', format: (v: any) => (+v).toFixed(2) + ' V' },
      '5302': { label: 'GSM Operator',     icon: '📶', format: (v: any) => String(v) },
      '2835': { label: 'Battery %',        icon: '🔋', format: (v: any) => String(v) + ' %' },
      '6267': { label: 'Door Front Left',  icon: '🚗', format: (v: any) => v === true ? '🔓 Open' : '' },
      '6268': { label: 'Door Front Right', icon: '🚗', format: (v: any) => v === true ? '🔓 Open' : '' },
      '6272': { label: 'Door Rear Left',   icon: '🚗', format: (v: any) => v === true ? '🔓 Open' : '' },
      '6273': { label: 'Door Rear Right',  icon: '🚗', format: (v: any) => v === true ? '🔓 Open' : '' },
      '6274': { label: '[6274]',           icon: '❓', format: (v: any) => v === true ? '🟢 ON' : '' },
      '6275': { label: '[6275]',           icon: '❓', format: (v: any) => v === true ? '🟢 ON' : '' },
    };
    const fields: Array<{icon: string; label: string; value: string}> = [];
    fields.push({ icon: '🚗', label: 'Speed', value: speed + ' km/h' });
    for (const key of Object.keys(r)) {
      if (skipKeys.has(key)) continue;
      const entry = r[key];
      if (entry?.value === undefined || entry?.value === null) continue;
      const meta = labelMap[key];
      if (meta) {
        const formatted = meta.format(entry.value);
        if (formatted === '') continue;
        fields.push({ icon: meta.icon, label: meta.label, value: formatted });
      } else {
        const val = typeof entry.value === 'boolean' ? (entry.value ? '🟢 ON' : '🔴 OFF') : String(entry.value);
        fields.push({ icon: '📌', label: '[' + key + ']', value: val });
      }
    }
    const attrLabelMap: Record<string, string> = {
      taximeter_status: '🚕 TaxiMeter',
      klient_status: '👤 Klient',
    };
    const skipAttrs = new Set(['MarkerColor', 'VehicleStatusTemplateGuid', 'MarkerIconSet', 'Evbattery']);
    for (const attrKey of Object.keys(a)) {
      if (skipAttrs.has(attrKey)) continue;
      const attrVal = a[attrKey]?.value;
      if (!attrVal) continue;
      let displayVal = attrVal;
      try {
        const parsed = JSON.parse(attrVal);
        const isOn = parsed?.color === '#00ff00' || parsed?.color === '#00FF00';
        displayVal = isOn ? '🟢 ON' : '🔴 OFF';
      } catch (e) { displayVal = attrVal; }
      const label = attrLabelMap[attrKey] || attrKey.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
      fields.push({ icon: '🏷️', label: label, value: displayVal });
    }
    fields.push({ icon: '🕐', label: 'Last Active', value: lastActive });
    return fields;
  }

  filterVehicles(): void {
    let list = [...this.vehicles];
    if (this.activeFilter !== 'all') {
      const labelMap: Record<string, string> = { moving: 'Moving', idle: 'Idle', parked: 'Parked', offline: 'Offline' };
      const target = labelMap[this.activeFilter];
      if (target) list = list.filter(v => this.getStatusLabel(v) === target);
    }
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(v =>
        (v.name || '').toLowerCase().includes(term) ||
        (v.username || '').toLowerCase().includes(term) ||
        (v.description || '').toLowerCase().includes(term)
      );
    }
    this.filteredVehicles = list;
  }

  focusVehicle(vehicle: VehicleUser): void {
    if (!vehicle.trackPoint?.pos) return;
    this.map.setView([vehicle.trackPoint.pos.lat, vehicle.trackPoint.pos.lng], 16);
    const marker = this.markers.get(vehicle.id);
    if (marker) { marker.setPopupContent(this.createPopupContent(vehicle)); marker.openPopup(); }
  }

  toggleSidebar(): void { this.sidebarOpen = !this.sidebarOpen; }

  toggleAppDropdown(): void {
    this.appDropdownOpen = !this.appDropdownOpen;
    this.appFilterTerm = '';
  }

  filteredApps(): any[] {
    if (!this.appFilterTerm) return this.allApps;
    return this.allApps.filter(a => a.name.toLowerCase().includes(this.appFilterTerm.toLowerCase()));
  }

  switchApp(appId: number): void {
    this.appDropdownOpen = false;
    this.authService.loginToApp(appId).subscribe({
      next: () => {
        this.currentAppId = appId;
        const app = this.allApps.find(a => a.id === appId);
        this.appName = app?.name || 'GPS Tracking';
        this.apiService.getViews().subscribe({ next: (views) => { this.views = views; if (views.length > 0) { this.selectedViewId = views[0].id; this.apiService.getUsers(this.selectedViewId).subscribe({ next: (users) => { this.vehicles = users; this.filterVehicles(); this.updateMarkers(); }, error: (err) => console.error(err) }); } } });
      },
      error: (err) => console.error('Switch app error:', err)
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}














