export interface GpsGateApplication {
  id: number;
  name: string;
  description: string;
  BOType: string;
  privileges: Record<string, string>;
  maxUsers: number;
  userCount: number;
  licensedUserCount: number;
  expired: boolean;
}

export interface Session {
  ApplicationId: number;
  SessionId: string;
  UserId: number;
  UserName: string;
  UserDisplayName: string;
  Hash: string;
  CsrfToken: string;
  Applications: Record<string, GpsGateApplication>;
}

export interface LoginResponse {
  id: number;
  result: {
    result: {
      Session: Session;
    };
  };
}

export interface GpsGateView {
  id: number;
  name: string;
  description: string;
  statusFilter: string;
  matchAllTags: boolean;
  tagIDs: number[];
}

export interface GetViewsResponse {
  id: number;
  result: {
    views: GpsGateView[];
    __type: string;
    queryTimeStamp: string;
    __result: string;
  };
}
