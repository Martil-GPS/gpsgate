export interface TrackPosition {
  lng: number;
  lat: number;
  alt: number;
}

export interface TrackVelocity {
  speed: number;
  heading: number;
}

export interface TrackPoint {
  pos: TrackPosition;
  vel: TrackVelocity;
  utc: number;
  valid: boolean;
}

export interface DeviceInfo {
  id: number;
  imei: string;
  protocolID: string;
  name: string;
}

export interface RecordDataEntry {
  time: number;
  modifiedTime: number;
  value: any;
}

export interface VehicleUser {
  id: number;
  username: string;
  name: string;
  surname: string | null;
  description: string | null;
  trackPoint: TrackPoint | null;
  calculatedSpeed: number;
  deviceActivity: number;
  devices: DeviceInfo[];
  kinds: string[];
  recordData?: { [key: string]: RecordDataEntry };
  attributes?: { [key: string]: { value: string; type: string; name: string } };
  driverID?: number | null;
  email?: string;
  phoneNumber?: string | null;
}
