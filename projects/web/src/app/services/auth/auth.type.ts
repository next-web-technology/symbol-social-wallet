export type AuthUserMetadata = {
  creatiionTime: string | undefined;
  lastSignInTime: string | undefined;
};

export type AuthUserProvider = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
};

export type AuthUser = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: AuthUserMetadata;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: AuthUserProvider[];
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
  uid: string;
};
