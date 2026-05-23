export const STAFF_USERNAME = "af1210";
export const STAFF_PASSWORD = "1210";
const AUTH_KEY = "akram-staff-auth";

export function isStaffAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "1";
}

export function setStaffAuthenticated(): void {
  sessionStorage.setItem(AUTH_KEY, "1");
}

export function clearStaffAuthenticated(): void {
  sessionStorage.removeItem(AUTH_KEY);
}

export function checkStaffCredentials(username: string, password: string): boolean {
  return username === STAFF_USERNAME && password === STAFF_PASSWORD;
}
