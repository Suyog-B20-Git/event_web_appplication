import { PlanScope, PlanVersion } from '../utils/plan';
import { LicenseModel } from '../utils/licenseModel';
export interface LicenseDetails {
    expiryDate: Date;
    licenseModel?: LicenseModel;
    orderNumber: string;
    planScope?: PlanScope;
    planVersion: PlanVersion;
}
export declare function generateLicense(details: LicenseDetails): string;
