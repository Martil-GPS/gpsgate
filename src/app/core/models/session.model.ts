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
