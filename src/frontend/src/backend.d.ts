import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Time = bigint;
export interface FileMetadata {
    owner: UserId;
    isEncrypted: boolean;
    size: bigint;
    fileName: string;
    uploadTimestamp: Time;
    fileId: FileId;
}
export type FileId = string;
export interface UserProfile {
    displayName: string;
    agreedToTerms: boolean;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFileMetadata(metadata: FileMetadata): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteFileAndMetadata(fileId: FileId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentUserProfile(): Promise<UserProfile>;
    getMyFiles(): Promise<Array<FileMetadata>>;
    getUserFileCount(userId: UserId): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isAdmin(user: Principal): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchFilesByCompositeIdentifier(searchTerm: string): Promise<Array<FileMetadata>>;
}
