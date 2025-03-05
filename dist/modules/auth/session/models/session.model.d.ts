import { DeviceInfo, LocationInfo, SessionMetadata } from 'src/shared/types/session-metadata.types';
declare class LocationModel implements LocationInfo {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
}
declare class DeviceModel implements DeviceInfo {
    browser: string;
    os: string;
    type: string;
}
declare class SessionMetadataModel implements SessionMetadata {
    location: LocationModel;
    device: DeviceModel;
    ip: string;
}
export declare class SessionModel {
    id: string;
    userId: string;
    createdAt: string;
    metadata: SessionMetadataModel;
}
export {};
