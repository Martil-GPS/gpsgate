export interface TrackPosition {
  lat: number;
  lng: number;
  alt: number;
}

export interface TrackVelocity {
  speed: number;
  heading: number;
}

export interface TrackPoint {
  pos: TrackPosition;
  vel: TrackVelocity;
  utc: string;
  valid: boolean;
}

export interface DeviceInfo {
  id: number;
  imei: string;
  protocolID: string;
  name: string;
}

export interface VehicleUser {
  id: number;
  username: string;
  name: string;
  surname: string | null;
  description: string;
  trackPoint: TrackPoint | null;
  calculatedSpeed: number;
  deviceActivity: string;
  devices: DeviceInfo[];
  originalApplicationID?: number;
}
