import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { VehicleUser } from '../models/user.model';
import { GpsGateView, GetViewsResponse } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class GpsGateApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getRpcHeaders(method: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'x-json-rpc': method,
      'x-requested-with': 'XMLHttpRequest',
      'x-csrf-token': this.authService.getCsrfToken()
    });
  }

  getViews(): Observable<GpsGateView[]> {
    const appId = this.authService.getSelectedAppId();
    const body = {
      id: 1,
      method: 'GetViews',
      params: { AppId: appId }
    };
    return this.http.post<GetViewsResponse>(
      `${environment.apiUrl}/rpc/View/v.1?_METHOD=GetViews`,
      body,
      { headers: this.getRpcHeaders('GetViews') }
    ).pipe(
      map(response => response.result.views)
    );
  }

  getUsers(): Observable<VehicleUser[]> {
    const appId = this.authService.getSelectedAppId();
    return this.http.get<VehicleUser[]>(
      `${environment.apiUrl}/api/v.1/applications/${appId}/users`,
      { headers: this.getRpcHeaders('getusers') }
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
      { headers: this.getRpcHeaders('getupdates') }
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
      { headers: this.getRpcHeaders('getusers') }
    );
  }
}
