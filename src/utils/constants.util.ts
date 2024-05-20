export const DB_NAME = "formez";

// API RESPONE
export const STATUS_CODE = {
  // 200
  OK: 200,
  CREATED: 201,

  // 400
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,

  // 500
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const SUCCESS_MESSAGES = {
  CREATED: "Created successfully",
  LOGIN_SUCCESS: "Logged in successfully",
  LOGOUT_SUCCESS: "Logged out successfully",
  MAIL_SEND: "Mail Send successfully",
  SAVED: "Saved successfully",
  PASS_CHANGED: "Password changed successfully",
  AUTHENTICATED: "Authenticated user",
  AUTH_FAILED: "Authentication failed, please enter valid credentails",
  DELETED: "Deleted successfully",
  UPDATED: "Updated successfully",
  SUCCESS: "Success",
  Failed: "failed",
  CONNECTIONS: "Connections fetch successfully",
};

export const ERROR_MESSAGES = {
  CANNOT_CONNECT: "Cannot connect",
  NOT_A_PREMIUM_ACCOUNT: "Not a premium account",
  WEBHOOK: "Webhook Error",
  EVENT_NOT_FOUND: "Event not found",
  PERSON_NOT_FOUND: "Person not found",
  CONNECTION_NOT_FOUND: "Connection not found",
  TOKEN_EXPIRES: "Token expired",
  NOT_FOUND: "Not found",
  ROUTE_NOT_FOUND: "Incorrect route",
  VALIDATION_FAILED: "Validation Failed, Kindly check your parameters",
  SERVER_ERROR: "Something went wrong, Please try again.",
  AUTHENTICATION_FAILED: "Please authenticate",
  UNAUTHORIZED: "You are not authorized to perform this action",
  EMAIL_ALREADY_EXIST: "This email already exist. Please try with other email",
  EMAIL_NOT_FOUND: "Email not found",
  ACCOUNT_NOT_EXIST: "Account does not exist",
  WRONG_PASSWORD: "Password is Incorrect",
  ACCOUNT_DELETED: "Your account has been deleted by Admin",
  ACCOUNT_BLOCKED: "Your account has been blocked by Admin",
  USER_NOT_FOUND: "User not found",
  LINK_NOT_FOUND: "Link not found",
  CONNECTION_ALREADY_EXIST: "Connection already exit",
  READY_SAVE: "Ready to save",
  SUBSCRIPTION_NOT_FOUND:
    "No subscription data found. The requested resource may not exist or has been deleted.",
  RECEIPT_VERIFICATION_FAILED: "The provided receipt has expired.",
};

// ENUM'S
export enum UserRole {
  Admin = "Admin",
  User = "User",
}

export enum Gender {
  MALE = "Male",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export const DATE_FORMAT = "YYYY-MM-DD";
