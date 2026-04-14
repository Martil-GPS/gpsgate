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
    const url = environment.apiUrl + '/rpc/View/v.1?_METHOD=GetViews';
    const body = { id: 1, method: 'GetViews', params: { AppId: appId } };
    return this.http.post(url, body,
      { headers: this.getRpcHeaders('GetViews'), responseType: 'text' as 'json' }
    ).pipe(
      map((text: any) => {
        const cleaned = text.replace(/new Date\((-?\d+)\)/g, "$1");
        const response: GetViewsResponse = JSON.parse(cleaned);
        return response.result.views;
      })
    );
  }

  private fetchChunk(viewId: number, index: number, count: number): Observable<any> {
    const appId = this.authService.getSelectedAppId();
    const url = environment.apiUrl + '/rpc/Directory/v.1?_METHOD=GetLatestUserDataByViewChunked';
    const body = {
      id: 1,
      method: 'GetLatestUserDataByViewChunked',
      params: { iViewID: viewId, iIndex: index, iCount: count, appId: appId }
    };
    return this.http.post(url, body,
      { headers: this.getRpcHeaders('GetLatestUserDataByViewChunked'), responseType: 'text' as 'json' }
    ).pipe(
      map((text: any) => {
        const cleaned = text.replace(/new Date\((-?\d+)\)/g, "$1");
        return JSON.parse(cleaned);
      })
    );
  }

  getUsers(viewId: number = 18): Observable<VehicleUser[]> {
    const chunkSize = 50;
    let allUsers: VehicleUser[] = [];
    let index = 0;
    return new Observable<VehicleUser[]>(observer => {
      const fetchNext = () => {
        this.fetchChunk(viewId, index, chunkSize).subscribe({
          next: (response) => {
            const result = response?.result?.result;
            if (!result) { observer.next(allUsers); observer.complete(); return; }
            const users: VehicleUser[] = result.users || [];
            if (index === 0) { console.log('RAW_RESPONSE:', JSON.stringify(result.users?.[0], null, 2));
            console.log('ALL_RECORD_KEYS:', Object.keys(result.users?.[0]?.recordData || {}));
            console.log('ALL_ATTRIBUTES:', Object.keys(result.users?.[0]?.attributes || {})); }
            allUsers = [...allUsers, ...users];
            index += chunkSize;
            if (result.completed) { observer.next(allUsers); observer.complete(); }
            else { fetchNext(); }
          },
          error: (err) => observer.error(err)
        });
      };
      fetchNext();
    });
  }

  getUpdates(viewId: number = 18): Observable<VehicleUser[]> {
    return this.getUsers(viewId);
  }
}




