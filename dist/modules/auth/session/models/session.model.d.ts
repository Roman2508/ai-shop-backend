import { DeviceInfo, LocationInfo, SessionMetadata } from 'src/shared/types/session-metadata.types';
export declare class LocationModel implements LocationInfo {
    country: string;
    city: string;
    latitude: number;
    longitude: number;
}
export declare class DeviceModel implements DeviceInfo {
    browser: string;
    os: string;
    type: string;
}
export declare class SessionMetadataModel implements SessionMetadata {
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
