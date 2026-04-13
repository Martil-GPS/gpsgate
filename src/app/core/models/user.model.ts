export interface TrackPosition {
  latitude: number;
  longitude: number;
  altitude: number;
}

export interface TrackVelocity {
  groundSpeed: number;
  heading: number;
}

export interface TrackPoint {
  position: TrackPosition;
  velocity: TrackVelocity;
  utc: string;
  valid: boolean;
}

export interface DeviceInfo {
  imei: string;
  protocolID: string;
}

export interface VehicleUser {
  id: number;
  username: string;
  name: string;
  description: string;
  trackPoint: TrackPoint | null;
  calculatedSpeed: number;
  deviceActivity: string;
  devices: DeviceInfo[];
}
