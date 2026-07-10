export type PrivateWorkProfile = {
  pid: string;
  workEmail: string;
};

// PERSONAL_ADMIN_PRIVATE
// Kept separate from the company product corpus. The app is private and the
// user explicitly requested fast landing-page access to this PID.
export const DEFAULT_PRIVATE_PROFILE: PrivateWorkProfile = {
  pid: "P3390812",
  workEmail: "Anthony.Diaz2@spectrum.com",
};
