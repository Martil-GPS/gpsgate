import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { VehicleUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GpsGateApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getUsers(): Observable<VehicleUser[]> {
    const appId = this.authService.getSelectedAppId();
    return this.http.get<VehicleUser[]>(
      `${environment.apiUrl}/api/v.1/applications/${appId}/users`,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  getUpdates(): Observable<any> {
    const appId = this.authService.getSelectedAppId();
    const body = {
      method: 'getupdates',
      appId: appId,
      params: {}
    };
    return this.http.post<any>(
      `${environment.apiUrl}/MobileAPI.ashx`,
      body,
      { headers: this.authService.getAuthHeaders() }
    );
  }

  getMobileUsers(): Observable<any> {
    const appId = this.authService.getSelectedAppId();
    const body = {
      method: 'getusers',
      appId: appId,
      params: {}
    };
    return this.http.post<any>(
      `${environment.apiUrl}/MobileAPI.ashx`,
      body,
      { headers: this.authService.getAuthHeaders() }
    );
  }
}
