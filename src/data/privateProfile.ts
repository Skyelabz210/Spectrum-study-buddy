export type PrivateWorkProfile = {
  pid: string;
  workEmail: string;
};

// PERSONAL_ADMIN_PRIVATE
// Never commit a real employee identifier or corporate email into a client bundle.
// The user enters these once in My Setup; the browser keeps them in localStorage
// and the landing page then displays the PID for rapid access on that device.
export const DEFAULT_PRIVATE_PROFILE: PrivateWorkProfile = {
  pid: "",
  workEmail: "",
};

