import { Request } from 'express';
import { SessionMetadata } from '../types/session-metadata.types';
export declare const getSessionMetadata: (req: Request, userAgent: string) => SessionMetadata;
