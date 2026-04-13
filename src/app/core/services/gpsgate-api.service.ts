import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { VehicleUser } from '../models/user.model';

const VIEW_ID = 43;
const CHUNK_SIZE = 1000;

@Injectable({ providedIn: 'root' })
export class GpsGateApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getUsers(): Observable<VehicleUser[]> {
    return from(this.fetchAllUsersChunked());
  }

  getUpdates(): Observable<VehicleUser[]> {
    return from(this.fetchAllUsersChunked());
  }

  private async fetchAllUsersChunked(): Promise<VehicleUser[]> {
    const appId = this.authService.getSelectedAppId();
    const csrf = this.authService.getCsrfToken();
    let allUsers: VehicleUser[] = [];
    let iIndex = 0;
    let completed = false;

    while (!completed) {
      const resp = await fetch(
        `${environment.apiUrl}/rpc/Directory/v.1?_METHOD=GetLatestUserDataByViewChunked`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'x-json-rpc': 'GetLatestUserDataByViewChunked',
            'x-requested-with': 'XMLHttpRequest',
            'x-csrf-token': csrf
          },
          body: JSON.stringify({
            id: 1,
            method: 'GetLatestUserDataByViewChunked',
            params: { iViewID: VIEW_ID, iIndex: iIndex, iCount: CHUNK_SIZE, appId: appId }
          })
        }
      );

      const text = await resp.text();
      const clean = text.replace(/new Date\((-?\d+)\)/g, '"$1"');
      const j = JSON.parse(clean);
      const result = j.result?.result;

      if (!result) break;
      if (result.users?.length) allUsers = allUsers.concat(result.users);
      completed = result.completed;
      iIndex += CHUNK_SIZE;
      if (iIndex > 100000) break;
    }

    return allUsers.filter(u => u.username !== 'admin');
  }
}
