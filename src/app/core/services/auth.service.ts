import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginResponse, Session, GpsGateApplication } from '../models/session.model';

const SITE_ADMIN_BO_TYPE = 'GpsGate.SiteAdminApplication.SiteAdminApplication';
const STORAGE_SESSION_KEY = 'gps_session';
const STORAGE_APP_KEY = 'gps_selected_app';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private session: Session | null = null;
  private selectedAppId: number | null = null;

  constructor(private http: HttpClient) { this.loadFromStorage(); }

  private loadFromStorage(): void {
    try {
      const sessionStr = localStorage.getItem(STORAGE_SESSION_KEY);
      if (sessionStr) { this.session = JSON.parse(sessionStr) as Session; }
      const appIdStr = localStorage.getItem(STORAGE_APP_KEY);
      if (appIdStr) { this.selectedAppId = parseInt(appIdStr, 10); }
    } catch (e) { this.session = null; this.selectedAppId = null; }
  }

  login(username: string, password: string): Observable<Session> {
    const body = { id: 1, method: 'Login', params: { strUserName: username, strPassword: password, bStaySignedIn: true, appId: 0 } };
    return this.http.post(environment.apiUrl + '/rpc/Directory/v.1?_METHOD=Login', body, {
      responseType: 'text',
      withCredentials: true
    }).pipe(
      map((text: string) => {
        const cleaned = text.replace(/new Date\((-?\d+)\)/g, '"$1"');
        const response = JSON.parse(cleaned) as LoginResponse;
        this.session = response.result.result.Session;
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(this.session));
        return this.session;
      })
    );
  }

  logout(): void {
    this.session = null;
    this.selectedAppId = null;
    localStorage.removeItem(STORAGE_SESSION_KEY);
    localStorage.removeItem(STORAGE_APP_KEY);
  }

  getSession(): Session | null { return this.session; }
  getHash(): string { return this.session?.Hash || ''; }
  getCsrfToken(): string { return this.session?.CsrfToken || ''; }

  getApplications(): GpsGateApplication[] {
    if (!this.session) return [];
    return Object.values(this.session.Applications).filter((a: any) => a.BOType !== SITE_ADMIN_BO_TYPE);
  }

  selectApplication(appId: number): void {
    this.selectedAppId = appId;
    localStorage.setItem(STORAGE_APP_KEY, appId.toString());
  }

  getSelectedAppId(): number | null { return this.selectedAppId; }
  isLoggedIn(): boolean { return this.session !== null && this.session.Hash !== ''; }
  hasSelectedApp(): boolean { return this.selectedAppId !== null; }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': this.getHash(), 'Content-Type': 'application/json' });
  }

  getRpcHeaders(method: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'x-json-rpc': method,
      'x-requested-with': 'XMLHttpRequest',
      'x-csrf-token': this.getCsrfToken()
    });
  }
}
