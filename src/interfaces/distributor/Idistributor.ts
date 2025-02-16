//   export interface AddDistributorRequest {
//   name: string;
//   logo_URL?: string;
//   commissionRate: number;
//   isActive: boolean;
//   locations: Array<{
//     type: "HQ" | "Branch";
//     location: string;
//     coordinates: {
//       latitude: number;
//       longitude: number;
//     };
//   }>;
//   contacts: Array<{
//     location: string;
//     phoneNumbers: Array<{
//       type: string;
//       number: string;
//     }>;
//     emails: Array<{
//       type: string;
//       email: string;
//     }>;
//   }>;
//   distributionRights?: Array<{
//     movieId: string;
//     commissionRate: number;
//     territories: string[];
//     validFrom: string;
//     validUntil: string;
//   }>;
// }

import { ImageUploadRequest } from "../auth/IImage";

// Coordinates used in a location
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// A location is either an HQ or a Branch
export interface Location {
  type: "HQ" | "Branch";
  location: string;
  coordinates: Coordinates;
}

// Phone number type. Note the optional _id field which appears only in responses.
export interface PhoneNumber {
  type: string;
  number: string;
  _id?: string;
}

// Email type with an optional _id for responses.
export interface Email {
  type: string;
  email: string;
  _id?: string;
}

// A contact includes a location, phone numbers, and emails.
export interface Contact {
  location: string;
  phoneNumbers: PhoneNumber[];
  emails: Email[];
}

// Distribution rights for a movie
export interface DistributionRight {
  movieId: string;
  commissionRate: number;
  territories: string[];
  validFrom: string;
  validUntil: string;
}

/**
 * Base interface for a distributor.
 * This interface is used for both requests and responses,
 * so that your request payload (e.g. AddDistributorRequest) doesn’t include
 * extra fields (like _id or timestamps) that you only expect from the server.
 */
export interface DistributorBase {
  name: string;
  logo_URL?: string;
  commissionRate: number;
  isActive: boolean;
  locations: Location[];
  contacts: Contact[];
  distributionRights?: DistributionRight[];
}

// =====================
// Request Interfaces
// =====================

/**
 * Request to add a distributor.
 * It reuses DistributorBase since no extra fields are needed.
 */


// =====================
// Response Interfaces
// =====================

/**
 * Distributor response type.
 * It extends DistributorBase and adds fields that the server attaches,
 * such as the unique identifier and timestamps.
 */
export interface DistributorResponse extends DistributorBase {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

/**
 * Response for adding a distributor.
 */
export interface AddDistributorResponse {
  message: string;
  Distributor: DistributorResponse;
}

/**
 * Response for getting all distributors.
 */
export interface GetAllDistributorsResponse {
  distributors: DistributorResponse[];
}

/**
 * Response for getting a specific distributor.
 * (Note: in your sample, the distributor is returned inside an array.)
 */
export interface GetDistributorResponse {
  distributor: DistributorResponse[];
}

/**
 * (Optional) A generic API response wrapper that can be reused if you decide
 * to wrap your data under a common key such as "data".
 *
 * export interface ApiResponse<T> {
 *   message?: string;
 *   data: T;
 * }
 */


export interface DistributorLogoRequest extends ImageUploadRequest{
  distributorId:string;
}