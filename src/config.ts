import {ServiceAccount} from 'firebase-admin';

export const config: any = JSON.parse(Buffer.from(process.env.CONFIG, 'base64').toString());
export const serviceAccount: ServiceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, 'base64').toString());
