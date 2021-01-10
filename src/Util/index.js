import UserType from "./UserType";

export const TOKEN = "AF_fashion_store_login_token";
export const ROLE = "AF_fashion_store_login_role";
export const EMAIL = "AF_fashion_store_login_email";
export const USER_ID = "AF_fashion_store_login_user_id";

export function SetToken(token) {
  localStorage.setItem(TOKEN, token);
}

export function SetRole(role) {
  localStorage.setItem(ROLE, role);
}

export function SetEmail(email) {
  localStorage.setItem(EMAIL, email);
}

export function SetId(id) {
  localStorage.setItem(USER_ID, id);
}

export function SetValuesOnStorage(token, role, email, id) {
  SetToken(token);
  SetRole(role);
  SetEmail(email);
  SetId(id);
}

export function UpdateEmailOnStorage(email) {
  SetEmail(email);
}

export function IsLoggedIn() {
  if (localStorage.getItem(TOKEN) !== null) return true;
  return false;
}

export function IsLibranianLoggedIn() {
  return IsLoggedIn() && getType() === UserType.LIBRARIAN;
}

export function IsCustomerLoggedIn() {
  return IsLoggedIn() && getType() === UserType.CUSTOMER;
}

export function Logout() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(ROLE);
  localStorage.removeItem(EMAIL);
}

export function getType() {
  return parseInt(localStorage.getItem(ROLE));
}

export function GetToken() {
  return localStorage.getItem(TOKEN);
}

export function GetId() {
  return localStorage.getItem(USER_ID);
}
