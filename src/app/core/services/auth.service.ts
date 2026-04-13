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

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<Session> {
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

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/rpc/Directory/v.1?_METHOD=Login`,
      body
    ).pipe(
      map(response => {
        this.session = response.result.result.Session;
        return this.session;
      })
    );
  }

  logout(): void {
    this.session = null;
    this.selectedAppId = null;
  }

  getSession(): Session | null {
    return this.session;
  }

  getHash(): string {
    if (!this.session) {
      return '';
    }
    return decodeURIComponent(this.session.Hash);
  }

  getApplications(): GpsGateApplication[] {
    if (!this.session) {
      return [];
    }
    return Object.values(this.session.Applications)
      .filter(app => app.BOType !== SITE_ADMIN_BO_TYPE);
  }

  selectApplication(appId: number): void {
    this.selectedAppId = appId;
  }

  getSelectedAppId(): number | null {
    return this.selectedAppId;
  }

  isLoggedIn(): boolean {
    return this.session !== null && this.session.Hash !== '';
  }

  hasSelectedApp(): boolean {
    return this.selectedAppId !== null;
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': this.getHash(),
      'Content-Type': 'application/json'
    });
  }
}
