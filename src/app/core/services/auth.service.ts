import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse, Session, GpsGateApplication } from '../models/session.model';

const SITE_ADMIN_BO_TYPE = 'GpsGate.SiteAdminApplication.SiteAdminApplication';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private session: Session | null = null;
  private selectedAppId: number | null = null;
  private savedPassword: string = '';

  constructor(private http: HttpClient) {
    const saved = sessionStorage.getItem('gpsgate_session');
    if (saved) {
      try { this.session = JSON.parse(saved); } catch {}
    }
    const savedAppId = sessionStorage.getItem('gpsgate_appId');
    if (savedAppId) {
      this.selectedAppId = parseInt(savedAppId);
    }
    const savedPw = sessionStorage.getItem('gpsgate_pw');
    if (savedPw) {
      this.savedPassword = savedPw;
    }
  }

  login(username: string, password: string): Observable<Session> {
    this.savedPassword = password;
    sessionStorage.setItem('gpsgate_pw', password);
    const body = {
      id: 1,
      method: 'Login',
      params: {
        strUserName: username,
        strPassword: password,
        bStaySignedIn: true,
        appId: 0
      }
    };
    return this.http.post(
      environment.apiUrl + '/rpc/Directory/v.1?_METHOD=Login',
      body,
      { responseType: 'text' as 'json', withCredentials: true }
    ).pipe(
      map((text: any) => {
        const cleaned = text.replace(/new Date\((-?\d+)\)/g, '""');
        const response: LoginResponse = JSON.parse(cleaned);
        this.session = response.result.result.Session;
        sessionStorage.setItem('gpsgate_session', JSON.stringify(this.session));
        return this.session;
      })
    );
  }

  loginToApp(appId: number): Observable<Session> {
    const body = {
      id: 1,
      method: 'Login',
      params: {
        strUserName: this.session?.UserName || '',
        strPassword: this.savedPassword,
        bStaySignedIn: true,
        appId: appId
      }
    };
    return this.http.post(
      environment.apiUrl + '/rpc/Directory/v.1?_METHOD=Login',
      body,
      { responseType: 'text' as 'json', withCredentials: true }
    ).pipe(
      map((text: any) => {
        const cleaned = text.replace(/new Date\((-?\d+)\)/g, '""');
        const response: LoginResponse = JSON.parse(cleaned);
        this.session = response.result.result.Session;
        this.selectedAppId = appId;
        sessionStorage.setItem('gpsgate_session', JSON.stringify(this.session));
        sessionStorage.setItem('gpsgate_appId', appId.toString());
        return this.session;
      })
    );
  }

  logout(): void {
    this.session = null;
    this.selectedAppId = null;
    this.savedPassword = '';
    sessionStorage.removeItem('gpsgate_session');
    sessionStorage.removeItem('gpsgate_appId');
    sessionStorage.removeItem('gpsgate_pw');
  }

  getSession(): Session | null { return this.session; }

  getHash(): string {
    if (!this.session) return '';
    return decodeURIComponent(this.session.Hash);
  }

  getApplications(): GpsGateApplication[] {
    if (!this.session) return [];
    return Object.values(this.session.Applications).filter(app => app.BOType !== SITE_ADMIN_BO_TYPE);
  }

  selectApplication(appId: number): void {
    this.selectedAppId = appId;
    sessionStorage.setItem('gpsgate_appId', appId.toString());
  }

  getSelectedAppId(): number | null { return this.selectedAppId; }

  isLoggedIn(): boolean { return this.session !== null && this.session.Hash !== ''; }

  hasSelectedApp(): boolean { return this.selectedAppId !== null; }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'x-json-rpc': 'request',
      'x-requested-with': 'XMLHttpRequest',
      'x-csrf-token': this.session?.CsrfToken || ''
    });
  }

  getCsrfToken(): string { return this.session?.CsrfToken || ''; }
}
